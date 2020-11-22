package hr.java.banking;

import java.util.Optional;

import hr.java.banking.entities.Iban;
import hr.java.banking.entities.Stranka;
import hr.java.banking.exceptions.BankingStatusException;

public interface StrankaService extends BaseService<Stranka> {
	
	Iban addIban(Iban iban, String strankaId) throws BankingStatusException;
	
	Optional<Stranka> findByIban(String iban);

}
