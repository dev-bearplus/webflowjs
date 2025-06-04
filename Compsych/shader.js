const vertexShader = `
    precision highp float;

    varying vec2 vUv;

    uniform float uPosition;
    uniform float uTime;
    uniform float uSpeed;
    uniform vec3 distortionAxis;
    uniform vec3 rotationAxis;
    uniform float uDistortion;

    float PI = 3.141592653589793238;

    mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;

        return mat4(
            oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
            oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
            oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
            0.0,                                0.0,                                0.0,                                1.0
        );
    }

    vec3 rotate(vec3 v, vec3 axis, float angle) {
        mat4 m = rotationMatrix(axis, angle);
        return (m * vec4(v, 1.0)).xyz;
    }

    float qinticInOut(float t) {
        return t < 0.5
            ? 16.0 * pow(t, 5.0)
            : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
    }

    void main() {
        vUv = uv;

        float norm = 0.5;
        vec3 newpos = position;
        float offset = (dot(distortionAxis, position) + norm / 2.0) / norm;

        float localprogress = clamp(
            (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1.0 - 0.01 * uDistortion),
            0.0,
            2.0
        );

        localprogress = qinticInOut(localprogress) * PI;

        newpos = rotate(newpos, rotationAxis, localprogress);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
`;
const fragmentShader = `
    precision highp float;

    uniform vec2 uImageSize;
    uniform vec2 uPlaneSize;
    uniform sampler2D tMap;

    varying vec2 vUv;

    void main() {
        vec2 ratio = vec2(
            min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
            min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
        );

        vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );

        gl_FragColor = texture2D(tMap, uv);
    }
`;
const noise = `
    //
    // Description : Array and textureless GLSL 2D simplex noise function.
    //      Author : Ian McEwan, Ashima Arts.
    //  Maintainer : stegu
    //     Lastmod : 20110822 (ijm)
    //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
    //               Distributed under the MIT License. See LICENSE file.
    //               https://github.com/ashima/webgl-noise
    //               https://github.com/stegu/webgl-noise
    //

    vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec2 mod289(vec2 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec3 permute(vec3 x) {
        return mod289(((x*34.0)+10.0)*x);
    }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                            -0.577350269189626,  // -1.0 + 2.0 * C.x
                            0.024390243902439); // 1.0 / 41.0
        // First corner
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);

        // Other corners
        vec2 i1;
        //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
        //i1.y = 1.0 - i1.x;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        // x0 = x0 - 0.0 + 0.0 * C.xx ;
        // x1 = x0 - i1 + 1.0 * C.xx ;
        // x2 = x0 - 1.0 + 2.0 * C.xx ;
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;

        // Permutations
        i = mod289(i); // Avoid truncation effects in permutation
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));

        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;

        // Gradients: 41 points uniformly over a line, mapped onto a diamond.
        // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;

        // Normalise gradients implicitly by scaling m
        // Approximation of: m *= inversesqrt( a0*a0 + h*h );
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

        // Compute final noise value at P
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }
`;
const utils = `
    // random
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    // contain
    vec2 getContainUvFrag(vec2 uv, vec2 textureSize, vec2 quadSize) {
        vec2 tempUv = uv - vec2(0.5);

        float quadAspect = quadSize.x / quadSize.y;
        float textureAspect = textureSize.x / textureSize.y;

        if (quadAspect > textureAspect) {
            tempUv *= vec2(quadAspect / textureAspect, 1.0);
        } else {
            tempUv *= vec2(1.0, textureAspect / quadAspect);
        }

        tempUv += vec2(0.5);

        return tempUv;
    }

    // cover
    vec2 getCoverUvVert(vec2 uv, vec2 textureSize, vec2 quadSize) {
        vec2 ratio = vec2(
            min((quadSize.x / quadSize.y) / (textureSize.x / textureSize.y), 1.0),
            min((quadSize.y / quadSize.x) / (textureSize.y / textureSize.x), 1.0)
        );

        return vec2(
            uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            uv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );
    }

    vec2 getCoverUvFrag(vec2 uv, vec2 textureSize, vec2 quadSize) {
        vec2 tempUv = uv - vec2(0.5);

        float quadAspect = quadSize.x / quadSize.y;
        float textureAspect = textureSize.x / textureSize.y;

        if (quadAspect < textureAspect) {
            tempUv *= vec2(quadAspect / textureAspect, 1.0);
        } else {
            tempUv *= vec2(1.0, textureAspect / quadAspect);
        }

        tempUv += vec2(0.5);

        return tempUv;
    }

    // uv, rotation (in radians), mid (point to rotate around)
    vec2 rotate(vec2 uv, float rotation, vec2 mid) {
        return vec2(
            cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
            cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
        );
    }
`;
const effectVertex = `
    float PI = 3.141592653589793;

    uniform vec2 uResolution; // in pixel
    uniform float uTime; // in s
    uniform vec2 uCursor; // 0 (left) 0 (top) / 1 (right) 1 (bottom)
    uniform float uScrollVelocity; // - (scroll up) / + (scroll down)
    uniform sampler2D uTexture; // texture
    uniform vec2 uTextureSize; // size of texture
    uniform vec2 uQuadSize; // size of texture element
    uniform float uBorderRadius; // pixel value
    uniform float uMouseEnter; // 0 - 1 (enter) / 1 - 0 (leave)
    uniform vec2 uMouseOverPos; // 0 (left) 0 (top) / 1 (right) 1 (bottom)

    ${utils}

    out vec2 vUv;  // 0 (left) 0 (bottom) - 1 (top) 1 (right)
    out vec2 vUvCover;


    vec3 deformationCurve(vec3 position, vec2 uv) {
        position.y = position.y - (sin(uv.x * PI) * min(abs(uScrollVelocity), 5.0) * sign(uScrollVelocity) * -0.01);

        return position;
    }

    void main() {
        vUv = uv;
        vUvCover = getCoverUvVert(uv, uTextureSize, uQuadSize);

        vec3 deformedPosition = deformationCurve(position, vUvCover);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(deformedPosition, 1.0);
    }
`;
const effectFragment = `
    precision highp float;

    uniform vec2 uResolution; // in pixel
    uniform float uTime; // in s
    uniform vec2 uCursor; // 0 (left) 0 (top) / 1 (right) 1 (bottom)
    uniform float uScrollVelocity; // - (scroll up) / + (scroll down)
    uniform sampler2D uTexture; // texture
    uniform vec2 uTextureSize; // size of texture
    uniform vec2 uQuadSize; // size of texture element
    uniform float uBorderRadius; // pixel value
    uniform float uMouseEnter; // 0 - 1 (enter) / 1 - 0 (leave)
    uniform vec2 uMouseOverPos; // 0 (left) 0 (top) / 1 (right) 1 (bottom)

    in vec2 vUv; // 0 (left) 0 (bottom) - 1 (right) 1 (top)
    in vec2 vUvCover;

    ${noise}

    out vec4 outColor;

    float calcDistance(vec2 uv) {
        vec2 positionInQuadrant = abs(uv * 2.0 - 1.0);
        vec2 extend = vec2(uQuadSize) / 2.0 - 0.5;
        vec2 coords = positionInQuadrant * (extend + uBorderRadius);
        vec2 delta = max(coords - extend, 0.0);

        return length(delta);
    }


    void main() {
        vec2 texCoords = vUvCover;

        // aspect ratio needed to create a real circle when quadSize is not 1:1 ratio
        float aspectRatio = uQuadSize.y / uQuadSize.x;

        // create a circle following the mouse with size 15
        float circle = 1.0 - distance(
            vec2(uMouseOverPos.x, (1.0 - uMouseOverPos.y) * aspectRatio),
            vec2(vUv.x, vUv.y * aspectRatio)
        ) * 15.0;

        // create noise
        float noise = snoise(gl_FragCoord.xy);

        // modify texture coordinates
        texCoords.x += mix(0.0, 2.0 * 1.0 * 0.01, uMouseEnter );
        texCoords.y += mix(0.0, 2.0 * 1.0 * 0.01, uMouseEnter );

        // texture
        vec3 texture = vec3(texture(uTexture, texCoords));

        // border-radius
        float alpha = 1.0;

        if (uBorderRadius > 0.0) {
            float dist = calcDistance(vUv);
            alpha = clamp(smoothstep(uBorderRadius, uBorderRadius - 1.0, dist), 0.0, 1.0);;
        }

        // output
        outColor = vec4(texture, alpha);
    }
`;