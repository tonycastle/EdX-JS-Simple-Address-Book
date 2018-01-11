window.onload = init;

let cm;

function init(){
	cm = new ContactManager;
	cm.addTestData();
	cm.printCon();
	cm.displayAsTable('contactList');
}

function formSubmitted(){
	let fname = document.querySelector('#fname');
	let surname = document.getElementById('surname');
	let email = document.getElementById('email');
	let contact = new Contact(fname.value,surname.value,email.value);
	cm.add(contact);

	fname.value = surname.value = email.value = "";
	cm.displayAsTable('contactList');
	return false;
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

	static compareContacts(c1,c2){
		if(c1.name < c2.name) return -1;
		if(c1.name > c2.name) return 1;
		return 0;
	}
	
	add(contact){
		this._contacts.push(contact);
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
	
	displayAsList(){
		let output = "<ul>";
		this._contacts.forEach(contact=>{
			output+=`<li>${contact.name} ${contact.surname}</li>`; 
		});
		output+="</ul>";
		return output;
	}

	displayAsTable(containerId){
		let container = document.querySelector(`#${containerId}`);
		container.innerHTML = "";
		if(this._contacts.length == 0){
			 container.innerHTML="<p>There are no contacts to display.</p>";
			 return;
		}

		let table = document.createElement("table");
		this._contacts.forEach(contact=>{
			let row = table.insertRow();
			row.innerHTML = `<td>${contact.name}</td><td>${contact.email}</td>`
		});
		container.appendChild(table);
	}

	sort(){
		this._contacts.sort(ContactManager.compareContacts);
	}

	save(){
		localStorage.contacts = JSON.stringify(this._contacts);
	}

	load(){
		if(localStorage.contacts !== undefined){
			this._contacts = JSON.parse(localStorage.contacts);
		}
	}

	empty(){
		this._contacts = [];
	}

	addTestData() {
		let c1 = new Contact("Jimi", "Hendrix", "jimi@rip.com");
  		let c2 = new Contact("Robert", "Fripp", "robert.fripp@kingcrimson.com");
  		let c3 = new Contact("Angus", "Young", "angus@acdc.com");
  		let c4 = new Contact("Arnold", "Schwarzenneger", "T2@terminator.com");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Let's sort the list of contacts by Name
		this.sort();
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
