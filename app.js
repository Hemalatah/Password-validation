/*
Your code goes here!
 */

/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

/*
Grabbing a few inputs to help you get started...
 */
var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');

/*
You'll probably find this function useful...
 */  


function issueTracker() {
	this.issues = [];
};

issueTracker.prototype = {
	add : function(message) {
		this.issues.push(message);
	},
	retrieve : function() {
		var message = "";
		switch(this.issues.length) {
			case 0:
				//do nothing- already meassge length is zero
				break;
			case 1:
				message = "Please correct the following issues:\n" + this.issues[0];
				break;
			default: 
				message = "Please correct the following issues:\n" + this.issues.join("\n");
				break;
		}
		return message;
	}

};



submit.onclick = function() {
	var firstPassword = firstPasswordInput.value;
	var secondPassword = secondPasswordInput.value;

	var firstPasswordIssuestracker = new issueTracker();

	var secondPasswordIssuestracker = new issueTracker();

	function checkRequirements() {
		if(firstPassword.length < 16) {
			firstPasswordIssuestracker.add("Password is too short");
		}
		else if(firstPassword.length > 100) {
			firstPasswordIssuestracker.add("Password is too long");
		}

		if(!firstPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
			firstPasswordIssuestracker.add("Add atleast one special character");
		}

		if(!firstPassword.match(/[\d]/g)) {
			firstPasswordIssuestracker.add("Add atleast one number");
		}

		if(!firstPassword.match(/[a-z]/g)) {
			firstPasswordIssuestracker.add("Add atleast one lowercase letter");
		}

		if(!firstPassword.match(/[A-Z]/g)) {
			firstPasswordIssuestracker.add("add atleast one uppercase letter");
		}


	};

	if(firstPassword.length === secondPassword.length && firstPassword.length > 0) {
		checkRequirements();
	}
	else {
		secondPasswordIssuestracker.add("Passwords should match!!");
	}

	

	var firstPasswordIssues = firstPasswordIssuestracker.retrieve();
	var secondPasswordIssues = secondPasswordIssuestracker.retrieve();

	firstPasswordInput.setCustomValidity(firstPasswordIssues);
	secondPasswordInput.setCustomValidity(secondPasswordIssues);

	if(firstPasswordIssues.length === 0 && secondPasswordIssues.length === 0) {
		alert("Password changed successfully!!!");
	}

};