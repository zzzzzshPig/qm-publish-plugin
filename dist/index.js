var e=function(){return(e=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},t=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{l(r.next(e))}catch(e){o(e)}}function u(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}l((r=r.apply(e,t||[])).next())}))},n=function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}},r=require("prompts"),i=require("shelljs"),o=require("fs");!function(){t(this,void 0,void 0,(function(){var t,a,u,l,c,s,f,p;return n(this,(function(n){switch(n.label){case 0:return t="../../package.json",a=require(t),(u=a.version.split("."))[u.length-1]=Number(u[u.length-1])+1,u=u.join("."),l=[{type:"text",name:"version",message:"当前版本"+a.version,initial:u}],[4,r(l)];case 1:return c=n.sent().version,i.echo("rollup building......"),i.exec("rollup -c"),[4,r([{type:"text",name:"commit",message:"Input Your git commit log",initial:"Update: "+c},{name:"push",type:"confirm",message:"Can you push code?"}])];case 2:return s=n.sent(),f=s.commit,p=s.push,o.writeFileSync(t,JSON.stringify(e(e({},a),{version:c}),null,4)),i.exec('git commit -a -m "'+f+'"'),i.exec("git tag -a "+c+' -m "'+c+'"'),p&&(i.exec("git push origin --follow-tags"),i.exec("git push gitlab --follow-tags")),[2]}}))}))}();
