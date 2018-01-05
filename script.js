var fname, surname, phone;

window.onload = function(){
	//setup the onclick functionality for the submit button
	const contactForm = document.getElementById("contactForm");
	contactForm.addEventListener('submit',processMyForm);

	fname = document.getElementById('fname');
	surname = document.getElementById('surname');
	phone = document.getElementById('phone');
	contactList = document.getElementById('contactList');
}

class Contact{
	constructor(name, surname, phone){
		this._name = name;
		this._surname = surname;
		this._phone = phone;
	}
	
	get name(){
		return this._name;
	}
	
	set name(name){
		this._name = name;
	}
	
	get surname(){
		return this._surname;
	}
	
	set surname(x){
		this._surname = x;
	}
	
	get phone(){
		return this._phone;
	}
	
	set phone(x){
		this._phone = x;
	}
}

class ContactManager{
	constructor(){
		this._contacts = [];
	}
	
	add(x){
		this._contacts.push(x);
	}
	
	list(){
		let output = "<ul>";
		this._contacts.forEach(contact=>{
			output+=`<li>${contact.name} ${contact.surname}</li>`; 
		});
		output+="</ul>";
		return output;
	}
}

let db = new ContactManager();

function processMyForm(e){
	e.preventDefault();
	const contact = new Contact(fname.value, surname.value, phone.value);
	db.add(contact);
	contactList.innerHTML = db.list();
	fname.value = surname.value = phone.value = "";
}
