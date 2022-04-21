// MessageToast
//import readXlsxFile from 'read-excel-file'
const parse = require('read-excel-file');


(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
	<html>
	<script type="text/javascript" src="path-to-javascript-file.js"></script>
		<body>
		<h2>Headline</h2>
		<input type="file" id="input" />
		</body>
	</html>
    `;

    customElements.define('com-sap-sample-helloworld1', class HelloWorld1 extends HTMLElement {


		constructor() {

			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
		    console.log('Methode onCustomWidgetAfterUpdate');
            if (this._firstConnection){

				this.loadUploadLibs();

				this.uploadProcess();
				
				
				//console.log(oChangedProperties['value']);
				//alert("Alert");
				//this.redraw();
            }
        }
        
		
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }


		loadUploadLibs() {	
			console.log('Methode loadUploadLibs');


			
		}

		uploadProcess() {	
			console.log('Methode uploadProcess');


			// Requiring the module
			const reader = require('xlsx')

			// Reading our test file
			const file = reader.readFile('https://mhpsac.github.io/sac/data_file.xlsx')

			let data = []

			const sheets = file.SheetNames

			for(let i = 0; i < sheets.length; i++)
			{
			const temp = reader.utils.sheet_to_json(
					file.Sheets[file.SheetNames[i]])
			temp.forEach((res) => {
				data.push(res)
			})
			}

			// Printing data
			console.log(data)
			
		}
	
	
        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
            redraw()
        }
        */

        redraw(){
        }
    });
})();
