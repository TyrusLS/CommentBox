
"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import * as React from "react";
import {AllComponents} from "./App";
import * as ReactDOM from "react-dom";
import { getValue, getCategoricalObjectValue } from "./settings";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import VisualObjectInstance = powerbi.VisualObjectInstance;


/**
 * Interface for CommentBox Sttings
 * @Interface
 */

interface CommentBoxSettings {
    commentContext:{
        context: string;
    },
    apiurl:{
        url: string;
    }

}
let defaultSettings: CommentBoxSettings = {
    commentContext:{
        context:""
    },apiurl:{
        url: ""
    }
    
}


interface CommentViewModel{
    settings
}


/**
 *  Function that converts queried data into a view model that will be used by the visual.
 * 
 * @function
 * @param {VisualUpdatOptions} options -Contains dataView which contains all the data
 *                                        the visual had queried.
 * @param {IVisualHost} host            - Contains references to the host which contains services
 */

function visualTransform(options:VisualUpdateOptions, host: IVisualHost): CommentViewModel {
let dataViews = options.dataViews;
let viewModel: CommentViewModel = {
    settings: <CommentBoxSettings>{}
}; 
if (!dataViews
    || !dataViews[0]
) {
    return viewModel;
}
let objects = dataViews[0].metadata.objects;

let commentBoxSettings: CommentBoxSettings = {
    commentContext:{
        context: getValue<string>(objects, 'commentContext', 'context', defaultSettings.commentContext.context),
    },apiurl:{
        url: getValue<string>(objects, 'apiurl', 'url', defaultSettings.apiurl.url),
    }
}
return{
    settings: commentBoxSettings
}

}
export class Visual implements IVisual {
    private commentBoxSettings: CommentBoxSettings;
    private target: HTMLElement;
     private host: IVisualHost;
     private locale: string;
     private reactRoot: React.ComponentElement<any, any>;

    /**
     * 
     * @param[EnumerateVisualObjectInstancesOptions]} options - Map of defines objects
     */

     public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        let objectName = options.objectName;
        let objectEnumeration: VisualObjectInstance[] = [];
   if(!this.commentBoxSettings){
                return objectEnumeration
            }
            switch(objectName){
                case'commentContext':
                try{
                objectEnumeration.push({
                    objectName: objectName,
                    properties:{
                        context: this.commentBoxSettings.commentContext.context
                    },
                    selector: null
                });
            }catch(err){console.log(err)}
                break;
                case 'apiurl':
                    try{
                        objectEnumeration.push({
                            objectName: objectName,
                            properties:{
                                url: this.commentBoxSettings.apiurl.url
                            },
                            selector: null
                        });
                    }catch(err){console.log(err)}
                    break;
            };
           
        return objectEnumeration
     }

        constructor(options: VisualConstructorOptions) {
            this.host = options.host;
            this.locale = options.host.locale;

            this.target = options.element;
            this.reactRoot = React.createElement(AllComponents, {});
            try{
            ReactDOM.render(this.reactRoot, this.target);
            }catch(err){
            console.log(err)
        }
    }

    public update(options: VisualUpdateOptions) {
        let viewModel: CommentViewModel = visualTransform(options, this.host);
        let settings = this.commentBoxSettings = viewModel.settings;
        
    let dataViews = options.dataViews;
    let categorical = dataViews[0].categorical;
    let category = categorical.categories[0];
    let context, url
    try{ context= settings.commentContext.context
         url = settings.apiurl.url
        }catch(err){console.log(err)}

   
    if(options.dataViews && options.dataViews[0]){
        AllComponents.update(category.values, context,url);
    } else {
        this.clear();
    }
        }
        private clear() {
            AllComponents.update([''],'','');
        }
    
}

