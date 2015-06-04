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

module swan {

    /**
     * UI 显示对象基类
     * @event lark.Event.RESIZE 当UI组件的尺寸发生改变时调度
     * @event swan.UIEvent.MOVE 当UI组件在父级容器中的位置发生改变时调度
     * @event swan.UIEvent.CREATION_COMPLETE 当UI组件第一次被添加到舞台并完成初始化后调度
     */
    export interface UIComponent extends lark.DisplayObject {

        ///**
        // * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
        // * 请务必调用super.createChildren()以完成父类组件的初始化
        // */
        // protected createChildren():void{}

        ///**
        // * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
        // */
        // protected commitProperties():void{}

        ///**
        // * 测量组件尺寸
        // */
        // protected measure():void{}

        ///**
        // * 更新显示列表
        // */
        // protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void{}

        ///**
        // * 标记父级容器的尺寸和显示列表为失效
        // */
        // protected invalidateParentLayout():void{}

        //$getWidth():number;
        //$setWidth(value:number):void;

        //$getHeight():number;
        //$setHeight(value:number):void;

        $UIComponent:Object;

        $includeInLayout:boolean;

        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout:boolean;
        /**
         * 距父级容器离左边距离
         */
        left:number;

        /**
         * 距父级容器右边距离
         */
        right:number;

        /**
         * 距父级容器顶部距离
         */
        top:number;

        /**
         * 距父级容器底部距离
         */
        bottom:number;

        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter:number;

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter:number;

        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth:number;

        /**
         * 相对父级容器高度的百分比
         */
        percentHeight:number;

        /**
         * 外部显式指定的宽度
         */
        explicitWidth:number;

        /**
         * 外部显式指定的高度
         */
        explicitHeight:number;


        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth:number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth:number;

        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight:number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight:number;

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width:number, height:number):void;

        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties():void;

        /**
         * 验证组件的属性
         */
        validateProperties():void;

        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize():void;

        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?:boolean):void;

        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList():void;

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList():void;

        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow():void;

        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void;

        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x:number, y:number):void;

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds:lark.Rectangle):void;

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds:lark.Rectangle):void;
    }

}

module swan.sys {

    export const enum UIKeys {
        left,
        right,
        top,
        bottom,
        horizontalCenter,
        verticalCenter,
        percentWidth,
        percentHeight,
        explicitWidth,
        explicitHeight,
        width,
        height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        measuredWidth,
        measuredHeight,
        oldPreferWidth,
        oldPreferHeight,
        oldX,
        oldY,
        oldWidth,
        oldHeight,
        invalidatePropertiesFlag,
        invalidateSizeFlag,
        invalidateDisplayListFlag,
        layoutWidthExplicitlySet,
        layoutHeightExplicitlySet,
        initialized
    }

    function isDeltaIdentity(m:lark.Matrix):boolean {
        return (m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1);
    }

    var validator = new sys.Validator();

    /**
     * Swan 显示对象基类模板。仅作为 UIComponent 的默认实现，为lark.sys.implemenetUIComponenet()方法提供代码模板。
     * 注意：在此类里不允许直接使用super关键字访问父类方法。一律使用this.$super属性访问。
     */
    export class UIComponentImpl extends lark.DisplayObject implements swan.UIComponent {
        /**
         * 构造函数
         */
        public constructor() {
            super();
            this.initializeUIValues();
        }

        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues():void {
            this.$UIComponent = {
                0: lark.NONE,       //left
                1: lark.NONE,       //right
                2: lark.NONE,       //top
                3: lark.NONE,       //bottom
                4: lark.NONE,       //horizontalCenter
                5: lark.NONE,       //verticalCenter
                6: lark.NONE,       //percentWidth
                7: lark.NONE,       //percentHeight
                8: lark.NONE,       //explicitWidth
                9: lark.NONE,       //explicitHeight
                10: 0,              //width
                11: 0,              //height
                12: 0,              //minWidth
                13: 100000,         //maxWidth
                14: 0,              //minHeight
                15: 100000,         //maxHeight
                16: 0,              //measuredWidth
                17: 0,              //measuredHeight
                18: lark.NONE,      //oldPreferWidth
                19: lark.NONE,      //oldPreferHeight
                20: 0,              //oldX
                21: 0,              //oldY
                22: 0,              //oldWidth
                23: 0,              //oldHeight
                24: true,           //invalidatePropertiesFlag
                25: true,           //invalidateSizeFlag
                26: true,           //invalidateDisplayListFlag
                27: false,          //layoutWidthExplicitlySet
                28: false,          //layoutHeightExplicitlySet
                29: false,          //initialized
            };
            this.$includeInLayout = true;
        }


        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {

        }

        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated():void {

        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties():void {
            var values = this.$UIComponent;
            if (values[UIKeys.oldWidth] != values[UIKeys.width] || values[UIKeys.oldHeight] != values[UIKeys.height]) {
                this.emitWith(lark.Event.RESIZE);
            }
            if (values[UIKeys.oldX] != this.$getX() || values[UIKeys.oldY] != this.$getY()) {
                UIEvent.emitUIEvent(this, UIEvent.MOVE);
            }
        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {

        }

        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
        }

        $super:any;

        $UIComponent:Object;

        $includeInLayout:boolean;

        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        public get includeInLayout():boolean {
            return this.$includeInLayout;
        }

        public set includeInLayout(value:boolean) {
            value = !!value;
            if (this.$includeInLayout === value)
                return;
            this.$includeInLayout = true;
            this.invalidateParentLayout();
            this.$includeInLayout = value;
        }

        $onAddToStage(stage:lark.Stage, nestLevel:number):void {
            this.$super.$onAddToStage.call(this, stage, nestLevel);
            this.checkInvalidateFlag();
            var values = this.$UIComponent;
            if (!values[sys.UIKeys.initialized]) {
                values[sys.UIKeys.initialized] = true;
                this.createChildren();
                this.childrenCreated();
                UIEvent.emitUIEvent(this, UIEvent.CREATION_COMPLETE);
            }
        }

        /**
         * 检查属性失效标记并应用
         */
        private checkInvalidateFlag(event?:Event):void {
            var values = this.$UIComponent;
            if (values[sys.UIKeys.invalidatePropertiesFlag]) {
                validator.invalidateProperties(this);
            }
            if (values[sys.UIKeys.invalidateSizeFlag]) {
                validator.invalidateSize(this);
            }
            if (values[sys.UIKeys.invalidateDisplayListFlag]) {
                validator.invalidateDisplayList(this);
            }
        }

        /**
         * 距父级容器离左边距离
         */
        public get left():number {
            return this.$UIComponent[UIKeys.left];
        }

        public set left(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (values[UIKeys.left] === value)
                return;
            values[UIKeys.left] = value;
            this.invalidateParentLayout();
        }

        /**
         * 距父级容器右边距离
         */
        public get right():number {
            return this.$UIComponent[UIKeys.right];
        }

        public set right(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (values[UIKeys.right] === value)
                return;
            values[UIKeys.right] = value;
            this.invalidateParentLayout();
        }

        /**
         * 距父级容器顶部距离
         */
        public get top():number {
            return this.$UIComponent[UIKeys.top];
        }

        public set top(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (values[UIKeys.top] === value)
                return;
            values[UIKeys.top] = value;
            this.invalidateParentLayout();
        }

        /**
         * 距父级容器底部距离
         */
        public get bottom():number {
            return this.$UIComponent[UIKeys.bottom];
        }

        public set bottom(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (values[UIKeys.bottom] == value)
                return;
            values[UIKeys.bottom] = value;
            this.invalidateParentLayout();
        }


        /**
         * 在父级容器中距水平中心位置的距离
         */
        public get horizontalCenter():number {
            return this.$UIComponent[UIKeys.horizontalCenter];
        }

        public set horizontalCenter(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (values[UIKeys.horizontalCenter] === value)
                return;
            values[UIKeys.horizontalCenter] = value;
            this.invalidateParentLayout();
        }

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        public get verticalCenter():number {
            return this.$UIComponent[UIKeys.verticalCenter];
        }

        public set verticalCenter(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (values[UIKeys.verticalCenter] === value)
                return;
            values[UIKeys.verticalCenter] = value;
            this.invalidateParentLayout();
        }


        /**
         * 相对父级容器宽度的百分比
         */
        public get percentWidth():number {
            return this.$UIComponent[UIKeys.percentWidth];
        }

        public set percentWidth(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (values[UIKeys.percentWidth] === value)
                return;
            values[UIKeys.percentWidth] = value;
            this.invalidateParentLayout();
        }

        /**
         * 相对父级容器高度的百分比
         */
        public get percentHeight():number {
            return this.$UIComponent[UIKeys.percentHeight];
        }

        public set percentHeight(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (values[UIKeys.percentHeight] === value)
                return;
            values[UIKeys.percentHeight] = value;
            this.invalidateParentLayout();
        }

        /**
         * 外部显式指定的宽度
         */
        public get explicitWidth():number {
            return this.$UIComponent[UIKeys.explicitWidth];
        }

        /**
         * 外部显式指定的高度
         */
        public get explicitHeight():number {
            return this.$UIComponent[UIKeys.explicitHeight];
        }

        /**
         * 组件宽度,默认值为lark.lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
         */
        $getWidth():number {
            this.validateSizeNow();
            return this.$UIComponent[UIKeys.width];
        }

        $setWidth(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (value < 0 || values[UIKeys.width] === value && values[UIKeys.explicitWidth] === value)
                return;
            values[UIKeys.width] = value;
            values[UIKeys.explicitWidth] = value;
            if (lark.isNone(value))
                this.invalidateSize();
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentLayout();
        }

        /**
         * 立即验证自身的尺寸。
         */
        private validateSizeNow():void {
            this.validateSize(true);
            this.updateFinalSize();
        }

        /**
         * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
         */
        $getHeight():number {
            this.validateSizeNow();
            return this.$UIComponent[UIKeys.height];
        }

        $setHeight(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (value < 0 || values[UIKeys.height] === value && values[UIKeys.explicitHeight] === value)
                return;
            values[UIKeys.height] = value;
            values[UIKeys.explicitHeight] = value;
            if (lark.isNone(value))
                this.invalidateSize();
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentLayout();
        }

        $setScaleX(value:number):boolean {
            var change = this.$super.$setScaleX.call(this, value);
            if (change) {
                this.invalidateParentLayout();
            }
            return change;
        }

        $setScaleY(value:number):boolean {
            var change = this.$super.$setScaleY.call(this, value);
            if (change) {
                this.invalidateParentLayout();
            }
            return change;
        }

        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        public get minWidth():number {
            return this.$UIComponent[UIKeys.minWidth];
        }

        public set minWidth(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (value < 0 || values[UIKeys.minWidth] === value) {
                return;
            }
            values[UIKeys.minWidth] = value;
            this.invalidateSize();
            this.invalidateParentLayout();
        }

        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        public get maxWidth():number {
            return this.$UIComponent[UIKeys.maxWidth];
        }

        public set maxWidth(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (value < 0 || values[UIKeys.maxWidth] === value) {
                return;
            }
            values[UIKeys.maxWidth] = value;
            this.invalidateSize();
            this.invalidateParentLayout();
        }

        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        public get minHeight():number {
            return this.$UIComponent[UIKeys.minHeight];
        }

        public set minHeight(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (value < 0 || values[UIKeys.minHeight] === value) {
                return;
            }
            values[UIKeys.minHeight] = value;
            this.invalidateSize();
            this.invalidateParentLayout();
        }


        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        public get maxHeight():number {
            return this.$UIComponent[UIKeys.maxHeight];
        }

        public set maxHeight(value:number) {
            value = +value || 0;
            var values = this.$UIComponent;
            if (value < 0 || values[UIKeys.maxHeight] === value) {
                return;
            }
            values[UIKeys.maxHeight] = value;
            this.invalidateSize();
            this.invalidateParentLayout();
        }

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        public setMeasuredSize(width:number, height:number):void {
            var values = this.$UIComponent;
            values[UIKeys.measuredWidth] = Math.ceil(+width || 0);
            values[UIKeys.measuredHeight] = Math.ceil(+height || 0);
        }


        /**
         * 设置组件的宽高。此方法不同于直接设置width,height属性，
         * 不会影响显式标记尺寸属性
         */
        private setActualSize(w:number, h:number):void {
            var change = false;
            var values = this.$UIComponent;
            if (values[UIKeys.width] !== w) {
                values[UIKeys.width] = w;
                change = true;
            }
            if (values[UIKeys.height] !== h) {
                values[UIKeys.height] = h;
                change = true;
            }
            if (change) {
                this.invalidateDisplayList();
                this.emitWith(lark.Event.RESIZE);
            }
        }

        $setX(value:number):boolean {
            var change = this.$super.$setX.call(this, value);
            if (change) {
                this.invalidateParentLayout();
                this.invalidateProperties();
            }
            return change;
        }

        $setY(value:number):boolean {
            var change = this.$super.$setY.call(this, value);
            if (change) {
                this.invalidateParentLayout();
                this.invalidateProperties();
            }
            return change;
        }


        /**
         * 标记属性失效
         */
        public invalidateProperties():void {
            var values = this.$UIComponent;
            if (!values[sys.UIKeys.invalidatePropertiesFlag]) {
                values[sys.UIKeys.invalidatePropertiesFlag] = true;
                if (this.$stage)
                    validator.invalidateProperties(this);
            }
        }

        /**
         * 验证组件的属性
         */
        public validateProperties():void {
            var values = this.$UIComponent;
            if (values[sys.UIKeys.invalidatePropertiesFlag]) {
                this.commitProperties();
                values[sys.UIKeys.invalidatePropertiesFlag] = false;
            }
        }

        /**
         * 标记提交过需要验证组件尺寸
         */
        public invalidateSize():void {
            var values = this.$UIComponent;
            if (!values[sys.UIKeys.invalidateSizeFlag]) {
                values[sys.UIKeys.invalidateSizeFlag] = true;
                if (this.$stage)
                    validator.invalidateSize(this);
            }
        }

        /**
         * 验证组件的尺寸
         */
        public validateSize(recursive?:boolean):void {
            if (recursive) {
                var children = this.$children;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var child = children[i];
                        if (lark.is(child, swan.Types.UIComponent)) {
                            (<swan.UIComponent>child).validateSize(true);
                        }
                    }
                }
            }
            var values = this.$UIComponent;
            if (values[sys.UIKeys.invalidateSizeFlag]) {
                var changed = this.measureSizes();
                if (changed) {
                    this.invalidateDisplayList();
                    this.invalidateParentLayout();
                }
                values[sys.UIKeys.invalidateSizeFlag] = false;
            }
        }

        /**
         * 测量组件尺寸，返回尺寸是否发生变化
         */
        private measureSizes():boolean {
            var changed = false;
            var values = this.$UIComponent;
            if (!values[sys.UIKeys.invalidateSizeFlag])
                return changed;

            if (lark.isNone(values[UIKeys.explicitWidth]) || lark.isNone(values[UIKeys.explicitHeight])) {
                this.measure();
                if (values[UIKeys.measuredWidth] < values[UIKeys.minWidth]) {
                    values[UIKeys.measuredWidth] = values[UIKeys.minWidth];
                }
                if (values[UIKeys.measuredWidth] > values[UIKeys.maxWidth]) {
                    values[UIKeys.measuredWidth] = values[UIKeys.maxWidth];
                }
                if (values[UIKeys.measuredHeight] < values[UIKeys.minHeight]) {
                    values[UIKeys.measuredHeight] = values[UIKeys.minHeight];
                }
                if (values[UIKeys.measuredHeight] > values[UIKeys.maxHeight]) {
                    values[UIKeys.measuredHeight] = values[UIKeys.maxHeight]
                }
            }
            var preferredW = this.getPreferredUWidth();
            var preferredH = this.getPreferredUHeight();
            if (preferredW !== values[UIKeys.oldPreferWidth] ||
                preferredH !== values[UIKeys.oldPreferHeight]) {
                values[UIKeys.oldPreferWidth] = preferredW;
                values[UIKeys.oldPreferHeight] = preferredH;
                changed = true;
            }
            return changed;
        }

        /**
         * 标记需要验证显示列表
         */
        public invalidateDisplayList():void {
            var values = this.$UIComponent;
            if (!values[sys.UIKeys.invalidateDisplayListFlag]) {
                values[sys.UIKeys.invalidateDisplayListFlag] = true;
                if (this.$stage)
                    validator.invalidateDisplayList(this);
            }
        }

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        public validateDisplayList():void {
            var values = this.$UIComponent;
            if (values[sys.UIKeys.invalidateDisplayListFlag]) {
                this.updateFinalSize();
                this.updateDisplayList(values[UIKeys.width], values[UIKeys.height]);
                values[sys.UIKeys.invalidateDisplayListFlag] = false;
            }
        }

        /**
         * 更新最终的组件宽高
         */
        private updateFinalSize():void {
            var unscaledWidth = 0;
            var unscaledHeight = 0;
            var values = this.$UIComponent;
            if (values[sys.UIKeys.layoutWidthExplicitlySet]) {
                unscaledWidth = values[UIKeys.width];
            }
            else if (!lark.isNone(values[UIKeys.explicitWidth])) {
                unscaledWidth = values[UIKeys.explicitWidth];
            }
            else {
                unscaledWidth = values[UIKeys.measuredWidth];
            }
            if (values[sys.UIKeys.layoutHeightExplicitlySet]) {
                unscaledHeight = values[UIKeys.height];
            }
            else if (!lark.isNone(values[UIKeys.explicitHeight])) {
                unscaledHeight = values[UIKeys.explicitHeight];
            }
            else {
                unscaledHeight = values[UIKeys.measuredHeight];
            }
            this.setActualSize(unscaledWidth, unscaledHeight);
        }

        /**
         * 立即应用组件及其子项的所有属性
         */
        public validateNow():void {
            if (this.$stage)
                validator.validateClient(this);
        }

        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout():void {
            var parent = this.$parent;
            if (!parent || !this.$includeInLayout || !lark.is(parent, swan.Types.UIComponent))
                return;
            (<swan.UIComponent><any>parent).invalidateSize();
            (<swan.UIComponent><any>parent).invalidateDisplayList();
        }

        /**
         * 设置组件的布局宽高
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
            layoutHeight = +layoutHeight || 0;
            layoutWidth = +layoutWidth || 0;
            if(layoutHeight<0||layoutWidth<0){
                return;
            }
            var values = this.$UIComponent;
            var maxWidth = values[UIKeys.maxWidth];
            var maxHeight = values[UIKeys.maxHeight];
            var minWidth = Math.min(values[UIKeys.minWidth], maxWidth);
            var minHeight = Math.min(values[UIKeys.minHeight], maxHeight);
            var width:number;
            var height:number;
            if (lark.isNone(layoutWidth)) {
                values[sys.UIKeys.layoutWidthExplicitlySet] = false;
                width = this.getPreferredUWidth();
            }
            else {
                values[sys.UIKeys.layoutWidthExplicitlySet] = true;
                width = Math.max(minWidth, Math.min(maxWidth, layoutWidth));
            }
            if (lark.isNone(layoutHeight)) {
                values[sys.UIKeys.layoutHeightExplicitlySet] = false;
                height = this.getPreferredUHeight();
            }
            else {
                values[sys.UIKeys.layoutHeightExplicitlySet] = true;
                height = Math.max(minHeight, Math.min(maxHeight, layoutHeight));
            }
            var matrix = this.$getMatrix();
            if (isDeltaIdentity(matrix)) {
                this.setActualSize(width, height);
                return;
            }

            var fitSize = sys.MatrixUtil.fitBounds(layoutWidth, layoutHeight, matrix,
                values[UIKeys.explicitWidth], values[UIKeys.explicitHeight],
                this.getPreferredUWidth(), this.getPreferredUHeight(),
                minWidth, minHeight, maxWidth, maxHeight);
            if (!fitSize) {
                fitSize = lark.Point.create(minWidth, minHeight);
            }
            this.setActualSize(fitSize.x, fitSize.y);
            lark.Point.release(fitSize);
        }

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
            var matrix = this.$getMatrix();
            if (!isDeltaIdentity(matrix)) {
                var bounds = lark.$TempRectangle;
                this.getLayoutBounds(bounds);
                x += this.$getX() - bounds.x;
                y += this.$getY() - bounds.y;
            }
            var changed:boolean = this.$super.$setX.call(this, x);
            if (this.$super.$setY.call(this, y) || changed) {
                UIEvent.emitUIEvent(this, UIEvent.MOVE);
            }
        }

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds(bounds:lark.Rectangle):void {
            var values = this.$UIComponent;
            var w:number;
            if (values[sys.UIKeys.layoutWidthExplicitlySet]) {
                w = values[UIKeys.width];
            }
            else if (!lark.isNone(values[UIKeys.explicitWidth])) {
                w = values[UIKeys.explicitWidth];
            }
            else {
                w = values[UIKeys.measuredWidth];
            }
            var h:number;
            if (values[sys.UIKeys.layoutHeightExplicitlySet]) {
                h = values[UIKeys.height];
            }
            else if (!lark.isNone(values[UIKeys.explicitHeight])) {
                h = values[UIKeys.explicitHeight];
            }
            else {
                h = values[UIKeys.measuredHeight];
            }
            this.applyMatrix(bounds, w, h);
        }


        private getPreferredUWidth():number {
            var values = this.$UIComponent;
            return lark.isNone(values[UIKeys.explicitWidth]) ?
                values[UIKeys.measuredWidth] : values[UIKeys.explicitWidth];
        }

        private getPreferredUHeight():number {
            var values = this.$UIComponent;
            return lark.isNone(values[UIKeys.explicitHeight]) ?
                values[UIKeys.measuredHeight] : values[UIKeys.explicitHeight];
        }

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getPreferredBounds(bounds:lark.Rectangle):void {
            var w = this.getPreferredUWidth();
            var h = this.getPreferredUHeight();
            this.applyMatrix(bounds, w, h);
        }


        private applyMatrix(bounds:lark.Rectangle, w:number, h:number):void {
            var bounds = bounds.setTo(0, 0, w, h);
            var matrix = this.$getMatrix();
            if (isDeltaIdentity(matrix)) {
                bounds.x += matrix.tx;
                bounds.y += matrix.ty;
            }
            else {
                matrix.$transformBounds(bounds);
            }
        }
    }

    /**
     * 检查一个函数的方法体是否为空。
     */
    function isEmptyFunction(prototype:any, key:string):boolean {
        if (typeof prototype[key] != "function") {
            return false;
        }
        var body = prototype[key].toString();
        var index = body.indexOf("{");
        var lastIndex = body.lastIndexOf("}");
        body = body.substring(index + 1, lastIndex);
        return body.trim() == "";
    }

    /**
     * 拷贝模板类的方法体和属性到目标类上。
     * @param target 目标类
     * @param template 模板类
     */
    export function mixin(target:any, template:any):void {
        for (var property in template) {
            if (template.hasOwnProperty(property)) {
                target[property] = template[property];
            }
        }
        var prototype = target.prototype;
        var protoBase = template.prototype;
        var keys = Object.keys(protoBase);
        var length = keys.length;
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (key == "__meta__") {
                continue;
            }
            if (!prototype.hasOwnProperty(key) || isEmptyFunction(prototype, key)) {
                var value = Object.getOwnPropertyDescriptor(protoBase, key);
                Object.defineProperty(prototype, key, value);
            }
        }
    }

    /**
     * 自定义类实现UIComponent的步骤：
     * 1.在自定义类的构造函数里调用：this.initializeUIValues();
     * 2.拷贝UIComponent接口定义的所有内容(包括注释掉的protected函数)到自定义类，将所有子类需要覆盖的方法都声明为空方法体。
     * 3.在定义类结尾的外部调用sys.implementUIComponent()，并传入自定义类。
     * 4.若覆盖了某个UIComponent的方法，需要手动调用UIComponentImpl.prototype["方法名"].call(this);
     * @param descendant 自定义的UIComponent子类
     * @param base 自定义子类继承的父类
     */
    export function implementUIComponent(descendant:any, base:any, isContainer?:boolean):void {
        mixin(descendant, UIComponentImpl);
        var prototype = descendant.prototype;
        prototype.$super = base.prototype;

        if (isContainer) {
            prototype.$childAdded = function (child:lark.DisplayObject, index:number):void {
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            prototype.$childRemoved = function (child:lark.DisplayObject, index:number):void {
                this.invalidateSize();
                this.invalidateDisplayList();
            };
        }

        if (DEBUG) {//用于调试时查看布局尺寸的便利属性，发行版时移除。
            Object.defineProperty(prototype, "preferredWidth", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getPreferredBounds(bounds);
                    return bounds.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "preferredHeight", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getPreferredBounds(bounds);
                    return bounds.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "preferredX", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getPreferredBounds(bounds);
                    return bounds.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "preferredY", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getPreferredBounds(bounds);
                    return bounds.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "layoutBoundsX", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    return bounds.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "layoutBoundsY", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    return bounds.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "layoutBoundsWidth", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    return bounds.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "layoutBoundsHeight", {
                get: function () {
                    var bounds = lark.$TempRectangle;
                    this.getLayoutBounds(bounds);
                    return bounds.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "measuredWidth", {
                get: function () {
                    return this.$UIComponent[UIKeys.measuredWidth];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(prototype, "measuredHeight", {
                get: function () {
                    return this.$UIComponent[UIKeys.measuredHeight];
                },
                enumerable: true,
                configurable: true
            });
        }
    }
}