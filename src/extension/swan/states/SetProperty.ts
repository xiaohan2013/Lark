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
     * 视图状态设置属性操作
     */
    export class SetProperty implements IOverride {
        /**
         * 创建一个SetProperty实例
         */
        public constructor(target:string, name:string, value:any) {
            this.target = target;
            this.name = name;
            this.value = value;
        }

        /**
         * 要修改的属性名
         */
        public name:string;

        /**
         * 目标实例名
         */
        public target:string;

        /**
         * 属性值
         */
        public value:any;

        /**
         * 旧的属性值
         */
        private oldValue:any;

        /**
         * 应用覆盖。将保留原始值，以便以后可以在 remove() 方法中恢复该值。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        public apply(host:Skin, parent:lark.DisplayObjectContainer):void {
            var obj:any = this.target ? host[this.target] : host;
            if (!obj)
                return;
            this.oldValue = obj[this.name];
            this.setPropertyValue(obj, this.name, this.value, this.oldValue);
        }

        /**
         * 删除覆盖。在 apply() 方法中记住的值将被恢复。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        public remove(host:Skin, parent:lark.DisplayObjectContainer):void {
            var obj:any = this.target ? host[this.target] : host;
            if (!obj)
                return;
            this.setPropertyValue(obj, this.name, this.oldValue, this.oldValue);
            this.oldValue = null;
        }

        /**
         * 设置属性值
         */
        private setPropertyValue(obj:any, name:string, value:any,
                                 valueForType:any):void {
            if (value === undefined || value === null)
                obj[name] = value;
            else if (typeof(valueForType) == "number")
                obj[name] = +value;
            else if (typeof(valueForType) == "boolean")
                obj[name] = this.toBoolean(value);
            else
                obj[name] = value;
        }

        /**
         * 转成Boolean值
         */
        private toBoolean(value:any):boolean {
            if (typeof(value) == "string")
                return value.toLowerCase() == "true";

            return value != false;
        }
    }

    lark.registerClass(SetProperty,Types.SetProperty,[Types.IOverride]);
}