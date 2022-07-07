warning: LF will be replaced by CRLF in angular.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in package-lock.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in package.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/app/app.component.ts.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/app/app.module.ts.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/app/educacion/educacion.component.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/app/habilidades/habilidades.component.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/app/habilidades/habilidades.component.ts.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/styles.css.
The file will have its original line endings in your working directory
[1mdiff --git a/angular.json b/angular.json[m
[1mindex f176561..2af1b01 100644[m
[1m--- a/angular.json[m
[1m+++ b/angular.json[m
[36m@@ -27,6 +27,7 @@[m
               "src/assets"[m
             ],[m
             "styles": [[m
[32m+[m[32m              "./node_modules/@angular/material/prebuilt-themes/pink-bluegrey.css",[m
               "src/styles.css"[m
             ],[m
             "scripts": [][m
[36m@@ -94,6 +95,7 @@[m
               "src/assets"[m
             ],[m
             "styles": [[m
[32m+[m[32m              "./node_modules/@angular/material/prebuilt-themes/pink-bluegrey.css",[m
               "src/styles.css"[m
             ],[m
             "scripts": [][m
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex d1774d5..77fd60b 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -9,10 +9,12 @@[m
       "version": "0.0.0",[m
       "dependencies": {[m
         "@angular/animations": "~13.3.0",[m
[32m+[m[32m        "@angular/cdk": "^13.3.9",[m
         "@angular/common": "~13.3.0",[m
         "@angular/compiler": "~13.3.0",[m
         "@angular/core": "~13.3.0",[m
         "@angular/forms": "~13.3.0",[m
[32m+[m[32m        "@angular/material": "^13.3.9",[m
         "@angular/platform-browser": "~13.3.0",[m
         "@angular/platform-browser-dynamic": "~13.3.0",[m
         "@angular/router": "~13.3.0",[m
[36m@@ -344,6 +346,28 @@[m
         "@angular/core": "13.3.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@angular/cdk": {[m
[32m+[m[32m      "version": "13.3.9",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@angular/cdk/-/cdk-13.3.9.tgz",[m
[32m+[m[32m      "integrity": "sha512-XCuCbeuxWFyo3EYrgEYx7eHzwl76vaWcxtWXl00ka8d+WAOtMQ6Tf1D98ybYT5uwF9889fFpXAPw98mVnlo3MA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": "^2.3.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "optionalDependencies": {[m
[32m+[m[32m        "parse5": "^5.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@angular/common": "^13.0.0 || ^14.0.0-0",[m
[32m+[m[32m        "@angular/core": "^13.0.0 || ^14.0.0-0",[m
[32m+[m[32m        "rxjs": "^6.5.3 || ^7.4.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@angular/cdk/node_modules/parse5": {[m
[32m+[m[32m      "version": "5.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/parse5/-/parse5-5.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-ugq4DFI0Ptb+WWjAdOK16+u/nHfiIrcE+sh8kZMaM0WllQKLI9rOUq6c2b7cwPkXdzfQESqvoqK6ug7U/Yyzug==",[m
[32m+[m[32m      "optional": true[m
[32m+[m[32m    },[m
     "node_modules/@angular/cli": {[m
       "version": "13.3.0",[m
       "resolved": "https://registry.npmjs.org/@angular/cli/-/cli-13.3.0.tgz",[m
[36m@@ -554,6 +578,23 @@[m
         "rxjs": "^6.5.3 || ^7.4.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@angular/material": {[m
[32m+[m[32m      "version": "13.3.9",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@angular/material/-/material-13.3.9.tgz",[m
[32m+[m[32m      "integrity": "sha512-FU8lcMgo+AL8ckd27B4V097ZPoIZNRHiCe3wpgkImT1qC0YwcyXZVn0MqQTTFSdC9a/aI8wPm3AbTClJEVw5Vw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": "^2.3.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@angular/animations": "^13.0.0 || ^14.0.0-0",[m
[32m+[m[32m        "@angular/cdk": "13.3.9",[m
[32m+[m[32m        "@angular/common": "^13.0.0 || ^14.0.0-0",[m
[32m+[m[32m        "@angular/core": "^13.0.0 || ^14.0.0-0",[m
[32m+[m[32m        "@angular/forms": "^13.0.0 || ^14.0.0-0",[m
[32m+[m[32m        "@angular/platform-browser": "^13.0.0 || ^14.0.0-0",[m
[32m+[m[32m        "rxjs": "^6.5.3 || ^7.4.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@angular/platform-browser": {[m
       "version": "13.3.0",[m
       "resolved": "https://registry.npmjs.org/@angular/platform-browser/-/platform-browser-13.3.0.tgz",[m
[36m@@ -11668,6 +11709,23 @@[m
         "tslib": "^2.3.0"[m
       }[m
     },[m
[32m+[m[32m    "@angular/cdk": {[m
[32m+[m[32m      "version": "13.3.9",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@angular/cdk/-/cdk-13.3.9.tgz",[m
[32m+[m[32m      "integrity": "sha512-XCuCbeuxWFyo3EYrgEYx7eHzwl76vaWcxtWXl00ka8d+WAOtMQ6Tf1D98ybYT5uwF9889fFpXAPw98mVnlo3MA==",[m
[32m+[m[32m      "requires": {[m
[32m+[m[32m        "parse5": "^5.0.0",[m
[32m+[m[32m        "tslib": "^2.3.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "parse5": {[m
[32m+[m[32m          "version": "5.1.1",[m
[32m+[m[32m          "resolved": "https://registry.npmjs.org/parse5/-/parse5-5.1.1.tgz",[m
[32m+[m[32m          "integrity": "sha512-ugq4DFI0Ptb+WWjAdOK16+u/nHfiIrcE+sh8kZMaM0WllQKLI9rOUq6c2b7cwPkXdzfQESqvoqK6ug7U/Yyzug==",[m
[32m+[m[32m          "optional": true[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "@angular/cli": {[m
       "version": "13.3.0",[m
       "resolved": "https://registry.npmjs.org/@angular/cli/-/cli-13.3.0.tgz",[m
[36m@@ -11813,6 +11871,14 @@[m
         "tslib": "^2.3.0"[m
       }[m
     },[m
[32m+[m[32m    "@angular/material": {[m
[32m+[m[32m      "version": "13.3.9",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@angular/material/-/material-13.3.9.tgz",[m
[32m+[m[32m      "integrity": "sha512-FU8lcMgo+AL8ckd27B4V097ZPoIZNRHiCe3wpgkImT1qC0YwcyXZVn0MqQTTFSdC9a/aI8wPm3AbTClJEVw5Vw==",[m
[32m+[m[32m      "requires": {[m
[32m+[m[32m        "tslib": "^2.3.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "@angular/platform-browser": {[m
       "version": "13.3.0",[m
       "resolved": "https://registry.npmjs.org/@angular/platform-browser/-/platform-browser-13.3.0.tgz",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 26d1e15..1072007 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -11,10 +11,12 @@[m
   "private": true,[m
   "dependencies": {[m
     "@angular/animations": "~13.3.0",[m
[32m+[m[32m    "@angular/cdk": "^13.3.9",[m
     "@angular/common": "~13.3.0",[m
     "@angular/compiler": "~13.3.0",[m
     "@angular/core": "~13.3.0",[m
     "@angular/forms": "~13.3.0",[m
[32m+[m[32m    "@angular/material": "^13.3.9",[m
     "@angular/platform-browser": "~13.3.0",[m
     "@angular/platform-browser-dynamic": "~13.3.0",[m
     "@angular/router": "~13.3.0",[m
[36m@@ -39,4 +41,4 @@[m
     "karma-jasmine-html-reporter": "~1.7.0",[m
     "typ