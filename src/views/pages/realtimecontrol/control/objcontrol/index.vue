<template>
    <div class="app-content">
        <canvas id="canvasid" width="500" height="500"></canvas>
    </div>
</template>
<script>
export default {
    name: 'YMeter',
    props: {
        options: {
            type: Object,
            default: () => {},
            required:true
        }
    },
    data() {
        return {
            id:'',
            ctx: null,
            timer: null,
            timerResize:false,
            width: 0,
            height: 0,
            rem: 0,
            circleX: 0, //中心x坐标
            circleY: 0, //中心y坐标
            radius: 100, //圆环半径
            //lineWidth: 28, //圆形线条的宽度
            lineGap: 10,
            //fontSize: 10, //字体大小
            percentProgress: this.options.series[0],
            percentTarget: this.options.series[1]>=this.options.series[2]?this.options.series[2]:this.options.series[1],
            percentTotal: this.options.series[2],
            // valueProcess: 0,
            // valueTarget: 225.5,
            // valueTotal: 250,
            //bottomFontSize: 20,
            bottomFontHeight: 40,
            widthPercent:0,
            screenWidth: document.body.clientWidth,
            //title: 'A相电压', //标题  
            //tags: ['优', '良', '中', '差'], //标示

        }
    },
    methods: {
        init() {
            let meter = document.querySelector(`#${this.id}`)
            this.ctx = meter.getContext('2d')
            let width = this.options.box.w 
            let height = this.options.box.h

            this.initWHAndDraw(width,height)
        },

        initWHAndDraw(width,height){
            this.width = width - this.options.grid.left - this.options.grid.right
            this.height = this.width
            this.widthPercent = this.width / this.screenWidth
            this.radius = parseInt(this.width / 2) - this.options.yAxis.axisLine.lineWidth
            this.circleX = this.width / 2 
            this.circleY = parseInt((this.height + this.options.yAxis.axisLabel.fontSize + this.bottomFontHeight) / 2)
            this.rem = 1 //比例

            //动态绘制数据
            this.drawDynamicData()
        },

        //画弧线
        drawSector(cx, cy, r, lineWidth, lineCap, endAngle, beginColor, endColor) {
            this.ctx.beginPath()
            this.ctx.lineWidth = lineWidth

            // 渐变色 - 可自定义
            let lineGrad = this.ctx.createLinearGradient(this.circleX - this.radius -this.options.yAxis.axisLine.lineWidth, this.circleY, this.circleX + this.radius +this.options.yAxis.axisLine.lineWidth, this.circleY)
            lineGrad.addColorStop(0.0, beginColor)
            lineGrad.addColorStop(1.0, endColor)
            this.ctx.strokeStyle = lineGrad
            //圆弧两端的样式
            this.ctx.lineCap = lineCap

            this.ctx.arc(cx, cy, r, Math.PI, endAngle)
            this.ctx.stroke()
        },

        //画背景
        drawBackground() {
            this.ctx.save()
            this.ctx.translate(this.circleX, this.circleY)

            //画出中心圆点
            this.ctx.beginPath()
            this.ctx.lineWidth = 2
            //以0，0为原点，r为半径，0为起始角，2*Math.PI为结束角，顺时针画圆
            this.ctx.arc(0, 0, 3, 0, 2 * Math.PI, false)
            this.ctx.stroke()

            //画出4个文字
            this.ctx.font = this.options.xAxis.axisLabel.fontSize + 'px Arial'
            this.ctx.textAlign = this.options.xAxis.axisLabel.textAlign
            this.ctx.textBaseline = this.options.xAxis.axisLabel.textBaseline
            this.ctx.fillStyle = this.options.xAxis.axisLabel.color
            for (let i = 0; i < this.options.xAxis.data.length; i++) {
                let rad = 1 * Math.PI / 4 * i + 1 * Math.PI / 8
                let x = Math.cos(-rad) * (this.radius -this.options.yAxis.axisLine.lineWidth)
                let y = Math.sin(-rad) * (this.radius -this.options.yAxis.axisLine.lineWidth)
                this.ctx.fillText(this.options.xAxis.data[i], x, y)
            }

            //画出刻度
            for (let i = 0; i < this.options.xAxis.data.length + 1; i++) {
                let x = this.radius -this.options.yAxis.axisLine.lineWidth
                let y = 0

                this.ctx.beginPath()
                this.ctx.lineWidth = this.options.xAxis.axisLine.lineWidth
                this.ctx.strokeStyle = this.options.xAxis.axisLine.lineColor
                if (i != 0) this.ctx.rotate(-45 * Math.PI / 180)
                this.ctx.rect(x, y, 6, 1)
                this.ctx.stroke()
            }
        },

        //画出指针
        drawPointer(pointer, colorStart, colorEnd) {
            this.ctx.save()
            this.ctx.beginPath()

            let linearGradient = this.ctx.createLinearGradient(0, 0, 100, 0)
            linearGradient.addColorStop(0, colorStart)
            linearGradient.addColorStop(1, colorEnd)
            this.ctx.fillStyle = linearGradient

            var rad = 1 * Math.PI / this.percentTotal * pointer
            this.ctx.rotate(rad)
            this.ctx.moveTo(3, -2)
            this.ctx.lineTo(3, 2)
            this.ctx.lineTo(this.radius -this.options.yAxis.axisLine.lineWidth - this.options.yAxis.pointStyle.lineGrad, 1)
            this.ctx.lineTo(this.radius -this.options.yAxis.axisLine.lineWidth - this.options.yAxis.pointStyle.lineGrad, -1)
            this.ctx.fill()
            this.ctx.restore()
        },

        //动态绘制数据
        drawing() {
            if (this.percentProgress >= this.percentTarget) {
                clearInterval(this.timer)
                this.ctx.clearRect(0, 0, this.width, this.height)

                //画背景弧线
                this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth, 'square', Math.PI * 2, this.options.yAxis.axisLine.backgroundColor, this.options.yAxis.axisLine.backgroundColor)

                if (this.percentTarget == this.percentTotal) {
                    this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth - 1, 'square', Math.PI * 2, this.options.yAxis.axisLine.startColor, this.options.yAxis.axisLine.endColor)
                } else {
                    if(this.percentTarget == 0){
                        this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth - 1, 'square', Math.PI * 1.01, this.options.yAxis.axisLine.backgroundColor, this.options.yAxis.axisLine.backgroundColor)
                    }else{
                        this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth - 1, 'square', Math.PI * 1.01, this.options.yAxis.axisLine.startColor, this.options.yAxis.axisLine.endColor)
                         this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth, 'round', Math.PI * (1 + this.percentTarget / this.percentTotal), this.options.yAxis.axisLine.startColor, this.options.yAxis.axisLine.endColor)
                    }
                }

                //画背景
                this.drawBackground()
                //画指针
                this.drawPointer(this.percentTarget, this.options.yAxis.pointStyle.startColor, this.options.yAxis.pointStyle.endColor)

                //画出文字
                //console.log(this.percentTarget)
                this.ctx.clearRect(0, this.circleY + 12, this.width, this.height)
                this.drawText(this.options.title.text, this.options.title.textStyle.fontSize, this.options.title.textStyle.color, this.circleY + 18)
                this.drawText(this.percentTarget.toFixed(this.options.yAxis.axisLabel.float) + ` ${this.options.yAxis.axisLabel.unit}`, this.options.yAxis.axisLabel.fontSize, this.options.yAxis.axisLabel.color, this.circleY + this.bottomFontHeight)
            } else {
                this.ctx.clearRect(0, 0, this.width, this.height)

                //画背景弧线
                this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth, 'square', Math.PI * 2, this.options.yAxis.axisLine.backgroundColor, this.options.yAxis.axisLine.backgroundColor)
                this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth - 1, 'square', Math.PI * 1.01, this.options.yAxis.axisLine.startColor, this.options.yAxis.axisLine.endColor)

                this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth, 'round', Math.PI * (1 + this.percentProgress / this.percentTotal), this.options.yAxis.axisLine.startColor, this.options.yAxis.axisLine.endColor)

                //画背景
                this.drawBackground()

                //画指针
                this.drawPointer(this.percentProgress, this.options.yAxis.pointStyle.startColor, this.options.yAxis.pointStyle.endColor)

                //画出文字
                //console.log(this.percentTarget)
                this.ctx.clearRect(0, this.circleY + 12, this.width, this.height)
                this.drawText(this.options.title.text, this.options.title.textStyle.fontSize, this.options.title.textStyle.color, this.circleY + 18)
                this.drawText(this.percentProgress.toFixed(1) + ` ${this.options.yAxis.axisLabel.unit}`, this.options.yAxis.axisLabel.fontSize, this.options.yAxis.axisLabel.color, this.circleY + this.bottomFontHeight)
            }
        },

        //动态绘制数据
        drawDynamicData() {
			//console.log(this.percentTarget)
            // if (this.percentTarget == 0 || this.valueTarget == 0) {
            //     //画背景弧线
            //     this.drawSector(this.circleX, this.circleY, this.radius,this.options.yAxis.axisLine.lineWidth, 'square', Math.PI * 2, '#d2d2d2', '#d2d2d2')
            //     //画背景
            //     this.drawBackground()
            //     //画指针
            //     //this.drawPointer(this.percentProgress,'rgb(6,168,243)','rgb(0,248,187)')
            //     this.drawPointer(this.percentProgress, this.options.yAxis.pointStyle.startColor, this.options.yAxis.pointStyle.endColor)
            //     return
            // }
            this.timer = setInterval(() => {
                if (this.percentProgress < this.percentTarget) {
                    if (this.percentProgress / this.percentTarget > 0.90) {
                        this.percentProgress += 1.30
                    } else if (this.percentProgress / this.percentTarget > 0.80) {
                        this.percentProgress += 1.55
                    } else if (this.percentProgress / this.percentTarget > 0.70) {
                        this.percentProgress += 2.75
                    } else {
                        this.percentProgress += 3.0
                    }
                }

                if (this.valueProcess < this.valueTarget) {
                    if (this.percentProgress / this.percentTarget > 0.90) {
                        this.valueProcess += 1.3
                    } else if (this.percentProgress / this.percentTarget > 0.80) {
                        this.valueProcess += 1.55
                    } else if (this.percentProgress / this.percentTarget > 0.70) {
                        this.valueProcess += 1.75
                    } else {
                        this.valueProcess += 2.0
                    }
                }

                this.drawing()
            }, this.options.yAxis.pointStyle.interval)
        },

        //绘制文字
        drawText(data, fontSize, color, y = this.circleY, x = this.circleX, textAlign = 'center', textBaseline = 'middle') {
            this.ctx.restore()
            this.ctx.font = fontSize + `px ${this.options.yAxis.axisLabel.fontFamily}`
            this.ctx.textAlign = textAlign
            this.ctx.textBaseline = textBaseline
            this.ctx.fillStyle = color

            this.ctx.fillText(data, x, y)
        },

        //生成唯一id
        uuid(len, radix) {//指定长度和基数
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [],i;
            radix = radix || chars.length;

            if (len) {
                // Compact form
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                // rfc4122, version 4 form
                var r;

                // rfc4122 requires these characters
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';

                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        }
    },
    created(){
        this.id = this.uuid(32)
    },
    mounted() {
        this.init()
        //console.log(this.percentProgress,this.percentTarget,this.percentTotal)
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
    },
    watch: {
        screenWidth(val) {
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if (!this.timerResize) {
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                this.screenWidth = val
                this.timerResize = true
                //this.reInit()
                this.$emit('screen-change',val)
                setTimeout(()=>{
                    this.timerResize = false
                }, 400)
            }
        },
        options:{
            handler(newVal,oldVal){
                this.percentProgress = newVal.series[0]
                this.percentTarget = newVal.series[1]>=newVal.series[2]?newVal.series[2]:newVal.series[1]
                this.percentTotal = newVal.series[2]
                this.init()
            },
            deep:true
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
};
</script>