export class Recomendation{
	public _fullName: string;
	public _phone: string;
	public _eMail: string;

	constructor(fullName: string, phone: string, eMail: string){
		this._fullName=fullName;
		this._phone=phone;
		this._eMail=eMail;
	}
}