
let PagerHelper = (function () {
    let _pageSize = 0;
    let _count = 0;
    let _pageNum = 0;
    // 私有函数
    function getBound() {
        this.start = (this.pageSize * (this.pageNum - 1));// 起始包含边界值
        this.end = this.pageSize * this.pageNum // 不包含后边界值

        this.total = this.count % this.pageSize === 0 ? this.count / this.pageSize : Math.ceil(this.count / this.pageSize);// 一共多少页
        this.pre_num = this.first;
        if (this.pageNum > 1) {
            this.pre_num = this.pageNum - 1;
        }
        this.last = this.total;

        this.next_num = this.last;
        if (this.pageNum < this.total) {
            this.next_num = this.pageNum + 1;
        }
        // console.log("pager helper", this.count, this.total, this.pageSize, this.pageNum);
    }
    return class {
        first = 1; 
        constructor(pageSize = 0, count = 0) {
            _pageSize = pageSize;
            _count = count;
            _pageNum = 1;

            getBound.call(this)
        }
        set pageNum(value) {
            _pageNum = value;
            getBound.call(this)
        }
        get pageNum() {
            return _pageNum;
        }

        set pageSize(value) {
            _pageSize = value;
            this.pageNum = 1;
            getBound.call(this)
        }
        get pageSize() {
            return _pageSize;
        }

        set count(value) {
            _count = value;
            // this.pageNum = 1;
            // this.getBound()
            getBound.call(this)
        }
        get count() {
            return _count;
        }
    }
})()

module.exports = new PagerHelper();