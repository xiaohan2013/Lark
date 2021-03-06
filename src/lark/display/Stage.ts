//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
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

module lark {
    /**
     * @language en_US
     * The Stage class represents the main drawing area.The Stage object is not globally accessible. You need to access
     * it through the stage property of a DisplayObject instance.<br/>
     * The Stage class has several ancestor classes — Sprite, DisplayObject, and EventEmitter — from which it inherits
     * properties and methods. Many of these properties and methods are inapplicable to Stage objects.
     * @event lark.Event.RESIZE Emitted when the stageWidth or stageHeight property of the Stage object is changed.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/StageExample.ts
     */
    /**
     * @language zh_CN
     * Stage 类代表主绘图区。
     * 可以利用 DisplayObject 实例的 stage 属性进行访问。<br/>
     * Stage 类具有多个祖代类: Sprite、DisplayObject 和 EventEmitter，属性和方法便是从这些类继承而来的。
     * 从这些继承的许多属性和方法不适用于 Stage 对象。
     * @event lark.Event.RESIZE 当stageWidth或stageHeight属性发生改变时调度
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/StageExample.ts
     */
    export class Stage extends Sprite {

        /**
         * @private
         * Stage不许允许自行实例化
         */
        public constructor() {
            super();
            this.$stage = this;
            this.$nestLevel = 1;
        }

        /**
         * @language en_US
         * Gets and sets the frame rate of the stage. The frame rate is defined as frames per second. Valid range for the
         * frame rate is from 0.01 to 1000 frames per second.<br/>
         * Note: setting the frameRate property of one Stage object changes the frame rate for all Stage objects
         * @default 30
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取并设置舞台的帧速率。帧速率是指每秒显示的帧数。帧速率的有效范围为每秒 0.01 到 60 个帧。<br/>
         * 注意: 修改任何一个Stage的frameRate属性都会同步修改其他Stage的帧率。
         * @default 30
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get frameRate():number {
            return sys.$ticker.$frameRate;
        }

        public set frameRate(value:number) {
            sys.$ticker.$setFrameRate(value);
        }

        /**
         * @private
         */
        $stageWidth:number = 0;

        /**
         * @language en_US
         * Indicates the width of the stage, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 舞台的当前宽度（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get stageWidth():number {
            return this.$stageWidth;
        }

        /**
         * @private
         */
        $stageHeight:number = 0;

        /**
         * @language en_US
         * Indicates the height of the stage, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 舞台的当前高度（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get stageHeight():number {
            return this.$stageHeight;
        }

        /**
         * @private
         * 设备屏幕引用
         */
        $screen:lark.sys.Screen;

        $scaleMode:string = "noScale";
        /**
         * @language en_US
         * A value from the StageScaleMode class that specifies which scale mode to use.
         * @see lark.StageScaleMode
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 一个 StageScaleMode 类中的值，指定要使用哪种缩放模式。
         * @see lark.StageScaleMode
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get scaleMode():string{
            return this.$scaleMode;
        }

        public set scaleMode(value:string){
            if(this.$scaleMode==value){
                return;
            }
            this.$scaleMode = value;
            this.$screen.updateScreenSize();
        }

        $highResolutionMode: string = "default";

        /**
         * @language en_US
         * HighResolutionMode defines render modes for high resolution devices
         *  HighResolutionMode.DEFAULT = "default" use device's logic resolution as the stage resolution and rendering resolution
         *  HighResolutionMode.RETINA = "retina"   use device's logic resolution as the stage resolution but rendering with high resolution
         *  HighResolutionMode.DEVICE = "device"   use device's phyical resolution as the stage resolution and rendering resolution
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * HighResolutionMode 类为高分辨率屏幕显示模式提供可选值。
         * 可选值为<br/>
         *  HighResolutionMode.DEFAULT = "default" 使用设备的逻辑分辨率作为舞台的尺寸和渲染分辨率。
         *  HighResolutionMode.RETINA = "retina"   使用设备的逻辑分辨率作为舞台的尺寸，但使用高清分辨率来渲染。
         *  HighResolutionMode.DEVICE = "device"   使用设备的物理分辨率作为舞台的尺寸
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get highResolutionMode(): string {
            return this.$highResolutionMode;
        }

        public set highResolutionMode(value: string) {
            if (this.$highResolutionMode == value)
                return;
            this.$highResolutionMode = value;
            this.$screen.updateScreenSize();
        }

        /**
         * @language en_US
         * After you call the invalidate() method, when the display list is next rendered, the Lark runtime sends a render
         * event to each display object that has registered to listen for the render event. You must call the invalidate()
         * method each time you want the Lark runtime to send render events.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 调用 invalidate() 方法后，在显示列表下次呈现时，Lark 会向每个已注册侦听 Event.RENDER 事件的显示对象发送一个 Event.RENDER 事件。
         * 每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 invalidate() 方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public invalidate():void {
            sys.$invalidateRenderFlag = true;
        }

        /**
         * @private
         */
        private implMap:any = {};

        /**
         * @language en_US
         * Adds an interface-name-to-implementation-class mapping to the registry.
         * @param interfaceName the interface name to register. For example："swan.IAssetAdapter","swan.Theme"
         * @param instance the instance to register.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 注册一个接口实现。
         * @param interfaceName 注入的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @param instance 实现此接口的实例。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public registerImplementation(interfaceName:string,instance:any):void{
            this.implMap[interfaceName] = instance;
        }

        /**
         * @language en_US
         * Returns the singleton instance of the implementation class that was registered for the specified interface.
         * This method is usually called by lark framework.
         * @param interfaceName The interface name to identify. For example："swan.IAssetAdapter","swan.Theme"
         * @returns the singleton instance of the implementation class
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取一个接口实现。此方法通常由框架内部调用。获取项目注入的自定义实现实例。
         * @param interfaceName 要获取的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @returns 返回实现此接口的实例。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public getImplementation(interfaceName:string):any {
            return this.implMap[interfaceName];
        }
    }

    if(DEBUG){

        Object.defineProperty(Stage.prototype, "alpha", {
            get: function () {
                return 1;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "visible", {
            get: function () {
                return true;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "x", {
            get: function () {
                return 0;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "y", {
            get: function () {
                return 0;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "scaleX", {
            get: function () {
                return 1;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "scaleY", {
            get: function () {
                return 1;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "rotation", {
            get: function () {
                return 0;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "cacheAsBitmap", {
            get: function () {
                return false;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "scrollRect", {
            get: function () {
                return null;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "filters", {
            get: function () {
                return null;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "blendMode", {
            get: function () {
                return null;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "matrix", {
            get: function () {
                return this.$getMatrix();
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "touchEnabled", {
            get: function () {
                return true;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });
    }
    if(DEBUG){
        lark.$markReadOnly(Stage,"stageWidth");
        lark.$markReadOnly(Stage,"stageHeight");
    }
}