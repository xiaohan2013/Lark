//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided this the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module lark.web {

    var isMobile = Capabilities.isMobile;

    export class WebTouchHandler extends LarkObject {

        public constructor(touch:lark.player.TouchHandler, canvas:HTMLCanvasElement) {
            super();
            this.canvas = canvas;
            this.touch = touch;
            this.addListeners();
        }

        private canvas:HTMLCanvasElement;
        private touch:lark.player.TouchHandler;

        /**
         * 添加事件监听
         */
        private addListeners():void {
            if (window.navigator.msPointerEnabled) {
                this.canvas.addEventListener("MSPointerDown", (event:any)=> {
                    this.onTouchBegin(event);
                    this.prevent(event);
                }, false);
                this.canvas.addEventListener("MSPointerMove", (event:any)=> {
                    this.onTouchMove(event);
                    this.prevent(event);
                }, false);
                this.canvas.addEventListener("MSPointerUp", (event:any)=> {
                    this.onTouchEnd(event);
                    this.prevent(event);
                }, false);
            }
            else {
                if (!isMobile) {
                    this.addMouseListener();
                }
                this.addTouchListener();
            }
        }

        private addMouseListener():void {
            this.canvas.addEventListener("mousedown", this.onTouchBegin);
            this.canvas.addEventListener("mousemove", this.onTouchMove);
            this.canvas.addEventListener("mouseup", this.onTouchEnd);
        }

        private addTouchListener():void {
            this.canvas.addEventListener("touchstart", (event:any)=> {
                var l = event.changedTouches.length;
                for (var i:number = 0; i < l; i++) {
                    this.onTouchBegin(event.changedTouches[i]);
                }
                this.prevent(event);
            }, false);
            this.canvas.addEventListener("touchmove", (event:any)=> {
                var l = event.changedTouches.length;
                for (var i:number = 0; i < l; i++) {
                    this.onTouchMove(event.changedTouches[i]);
                }
                this.prevent(event);
            }, false);
            this.canvas.addEventListener("touchend", (event:any)=> {
                var l = event.changedTouches.length;
                for (var i:number = 0; i < l; i++) {
                    this.onTouchEnd(event.changedTouches[i]);
                }
                this.prevent(event);
            }, false);
            this.canvas.addEventListener("touchcancel", (event:any)=> {
                var l = event.changedTouches.length;
                for (var i:number = 0; i < l; i++) {
                    this.onTouchEnd(event.changedTouches[i]);
                }
                this.prevent(event);
            }, false);
        }

        private prevent(event):void {
            event.stopPropagation();
            if (event["isScroll"] != true) {
                event.preventDefault();
            }
        }

        private onTouchBegin = (event:any):void => {
            var location = this.getLocation(event);
            if(isMobile){
                this.touch.onTouchMove(location.x, location.y, event.identifier);
            }
            this.touch.onTouchBegin(location.x, location.y, event.identifier);
        }

        private onTouchMove = (event:any):void => {
            var location = this.getLocation(event);
            this.touch.onTouchMove(location.x, location.y, event.identifier);

        }

        private onTouchEnd = (event:any):void => {
            var location = this.getLocation(event);
            this.touch.onTouchEnd(location.x, location.y, event.identifier);
        }

        private getLocation(event:any):Point {
            event.identifier = +event.identifier || 0;
            var doc = document.documentElement;
            var box = this.canvas.getBoundingClientRect();
            var left = box.left + window.pageXOffset - doc.clientLeft;
            var top = box.top + window.pageYOffset - doc.clientTop;
            var x = (event.pageX - left) / this.scaleX;
            var y = (event.pageY - top) / this.scaleY;
            return $TempPoint.setTo(Math.round(x), Math.round(y));
        }

        private scaleX:number = 1;
        private scaleY:number = 1;

        /**
         * 更新屏幕当前的缩放比例，用于计算准确的点击位置。
         * @param scaleX 水平方向的缩放比例。
         * @param scaleY 垂直方向的缩放比例。
         */
        public updateScaleMode(scaleX:number, scaleY:number):void {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        }
    }
}