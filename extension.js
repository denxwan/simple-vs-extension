// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let tuples = vscode.languages.getDiagnostics();
    //let basePath = vscode.workspace.rootPath;
	//let baseLength = basePath.length + 1;
	//console.log(tuples);

	var totalErrorCount = 0;

	// getting the error count
	for (var [thisUri,thisDiagnostics] of tuples) {
		for (let thisDiagnostic of thisDiagnostics) {
			totalErrorCount++;
		}
	}

	// calculating the error level
	if (totalErrorCount > 0 && totalErrorCount <= 2) {
		// low level
		console.log("\u001b[1;31mError status: low level");
	}
	else if (totalErrorCount > 2 && totalErrorCount <= 5) {
		// moderate level
		console.log("\u001b[1;31mError status: moderate level");
	}
	else if (totalErrorCount > 5 && totalErrorCount <= 10) {
		// severe level
		console.log("\u001b[1;31mError status: severe level");
	}
	else if (totalErrorCount > 10) {
		// oh boi you got it level
		console.log("\u001b[1;31mError status: critical level");
		
	}


	// debugging
	console.log("Total number of errors : " + totalErrorCount);



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('simple-vs-extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from Simple VS Extension!');
		// --> console.log(vscode.languages.getDiagnostics());
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}


// let tuples = languages.getDiagnostics();
//     let basePath = workspace.rootPath;
//     let baseLength = basePath.length + 1;
//     let diagnosticOutputs: diagnosticOutput[] = [];
//     for (var [thisUri,thisDiagnostics] of tuples) {
//         for (let thisDiagnostic of thisDiagnostics) {
//             let myDiagnosticOutput : diagnosticOutput = new diagnosticOutput();
//             if (thisUri.fsPath.startsWith(basePath)) {
//                 myDiagnosticOutput.fsPath = thisUri.fsPath.substring(baseLength);
//             } else {
//                 myDiagnosticOutput.fsPath = thisUri.fsPath;
//             }
//             myDiagnosticOutput.code = thisDiagnostic.code;
//             myDiagnosticOutput.message = thisDiagnostic.message;
//             myDiagnosticOutput.startLine = thisDiagnostic.range.start.line;
//             myDiagnosticOutput.startCharacter = thisDiagnostic.range.start.character;
//             myDiagnosticOutput.endLine = thisDiagnostic.range.end.line;
//             myDiagnosticOutput.endCharacter = thisDiagnostic.range.end.character;
//             diagnosticOutputs.push(myDiagnosticOutput);
//         }
//     }