package hr.java.banking;

import java.util.Optional;

import hr.java.banking.entities.Stranka;
import hr.java.banking.exceptions.BankingStatusException;

public interface StrankaService extends BaseService<Stranka> {
	
	Optional<Stranka> findByIbanAndNaziv(String iban, String naziv);

}
