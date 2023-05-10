export class Recomendation{
	public _fullName: string;
	public _phone: string;
	public _eMail: string;
	public _recomendation: string;

	constructor(fullName: string, phone: string, eMail: string, recomendation: string){
		this._fullName=fullName;
		this._phone=phone;
		this._eMail=eMail;
		this._recomendation=recomendation;
	}
}