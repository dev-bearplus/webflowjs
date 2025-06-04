const blog = {
    namespace: 'blog',
    afterEnter(data) {
        console.log(`enter ${this.namespace}`)
        setTimeout(() => {
            fsLoad();
        }, 1000)
    },
    beforeLeave() {  }
}
export default blog;