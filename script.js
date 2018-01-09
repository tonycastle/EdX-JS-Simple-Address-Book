var fname, surname, email;

window.onload = function(){
	//setup the onclick functionality for the submit button
	const contactForm = document.getElementById("contactForm");
	contactForm.addEventListener('submit',processMyForm);

	fname = document.getElementById('fname');
	surname = document.getElementById('surname');
	email = document.getElementById('email');
	contactList = document.getElementById('contactList');
}

class Contact{
	constructor(name, surname, email){
		this._name = name;
		this._surname = surname;
		this._email = email;
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
	
	get email(){
		return this._email;
	}
	
	set email(x){
		this._email = x;
	}
}

class ContactManager{
	constructor(){
		this._contacts = [];
	}
	
	add(x){
		this._contacts.push(x);
	}

	remove(contact){
		//match the contact from the contat list based on email
		for(let i=0; i<this._contacts.length;i++){
			if(this._contacts[i].email === contact.email){
				this._contacts.splice(i,1);
				break;
			}
		}

	}

	printCon(){
		this._contacts.forEach(contact=>console.log(contact.name));
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
	const contact = new Contact(fname.value, surname.value, email.value);
	db.add(contact);
	contactList.innerHTML = db.list();
	fname.value = surname.value = email.value = "";
}
