package hr.java.banking.impl;

import java.util.Optional;

import hr.java.banking.IbanService;
import hr.java.banking.entities.Iban;
import hr.java.banking.exceptions.BankingStatusException;
import hr.java.banking.repository.IbanRepository;

public class IbanServiceImpl extends BaseServiceImpl<Iban, IbanRepository> implements IbanService {

	public IbanServiceImpl(IbanRepository repository) {
		super(repository);
	}

	@Override
	public Iban update(Iban object) throws BankingStatusException {
		Iban iban = null;
		Optional<Iban> optional = super.findOne(object.getId());
		if(optional.isPresent()) 
		{
			iban = optional.get();
		}
		else
		{
			throw new BankingStatusException(404, "Iban s određenim identifikacijskim brojem ne postoji");
		}
		iban.setIban(object.getIban());
		iban.setOpis(object.getOpis());
		
		return super.save(iban);
	}
	
	

}
