// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	//var imageLink;
    //let basePath = vscode.workspace.rootPath;
	//let baseLength = basePath.length + 1;
	//console.log(tuples);
	
	// // variables
	// let tuples = vscode.languages.getDiagnostics();
	// var totalErrorCount = 0;

	// // getting the error count
	// for (var [thisUri,thisDiagnostics] of tuples) {
	// 	for (let thisDiagnostic of thisDiagnostics) {
	// 		totalErrorCount++;
	// 	}
	// }

	// // calculating the error level
	// if (totalErrorCount > 0 && totalErrorCount <= 2) {
	// 	// low level
	// 	console.log("\u001b[1;31mError status: low level");
	// }
	// else if (totalErrorCount > 2 && totalErrorCount <= 5) {
	// 	// moderate level
	// 	console.log("\u001b[1;31mError status: moderate level");
	// }
	// else if (totalErrorCount > 5 && totalErrorCount <= 10) {
	// 	// severe level
	// 	console.log("\u001b[1;31mError status: severe level");
	// }
	// else if (totalErrorCount > 10) {
	// 	// oh boi you got it level
	// 	console.log("\u001b[1;31mError status: critical level");
	// 	let imageLink='https://s3.getstickerpack.com/storage/uploads/sticker-pack/mr-incredible-pack/sticker_9.webp';
	// }


	// debugging
	//console.log("Total number of errors : " + totalErrorCount);

	// listning to updates on code
	let currentEditor = vscode.window.activeTextEditor;
	let listner = vscode.workspace.onDidChangeTextDocument((currentEditor) => {
			// console.log('something changed!');
			checkErrors();
		}
	)

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	// track currently webview panel
	let currentPanel = vscode.WebviewPanel | undefined;

	let disposable = vscode.commands.registerCommand('simple-vs-extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from Simple VS Extension!');


		// simple webview

		const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		if (currentPanel) {
			currentPanel.reveal(columnToShowIn);
		} else {
			const panel = vscode.window.createWebviewPanel(
				'catCoding',
				'Cat Coding',
				vscode.ViewColumn.Nine,
				//columnToShowIn.Nine,
				{}
			);
	
			// HTML content
			panel.webview.html = getWebviewContent(checkErrors());

			const updateWebView = () => {
				panel.webview.html = getWebviewContent(checkErrors());
			}

			setInterval(updateWebView, 500);
		}



		// --> console.log(vscode.languages.getDiagnostics());
	});

	context.subscriptions.push(disposable);

}

function checkErrors() {
	// variables
	let tuples = vscode.languages.getDiagnostics();
	var totalErrorCount = 0;
	let imageLink;
	var objArr = [];

	// getting the error count
	for (var [thisUri,thisDiagnostics] of tuples) {
		for (let thisDiagnostic of thisDiagnostics) {
			totalErrorCount++;
		}
	}

	// calculating the error level
	if (totalErrorCount > 0 && totalErrorCount <= 2) {
		// low level
		//console.log("\u001b[1;31mError status: low level");
		imageLink='https://s3.getstickerpack.com/storage/uploads/sticker-pack/mr-incredible-pack/sticker_2.webp';
	}
	else if (totalErrorCount > 2 && totalErrorCount <= 5) {
		// moderate level
		//console.log("\u001b[1;31mError status: moderate level");
		imageLink='https://s3.getstickerpack.com/storage/uploads/sticker-pack/mr-incredible-pack/sticker_8.webp';
	}
	else if (totalErrorCount > 5 && totalErrorCount <= 10) {
		// severe level
		//console.log("\u001b[1;31mError status: severe level");
		imageLink='https://s3.getstickerpack.com/storage/uploads/sticker-pack/mr-incredible-pack/sticker_9.webp';
	}
	else if (totalErrorCount > 10) {
		// oh boi you got it level
		//console.log("\u001b[1;31mError status: critical level");
		imageLink='https://s3.getstickerpack.com/storage/uploads/sticker-pack/mr-incredible-pack/sticker_14.webp';
	}

	objArr.push(imageLink);
	objArr.push(totalErrorCount);

	return objArr;
}

function getWebviewContent(objArr) {
	return `
		<html>
			<body>
				<hr>
				<img src=${objArr[0]} width=200px/>
				<h4>⚠️ Active errors count: ${objArr[1]}</h4>
			</body>
		</html>
	`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
