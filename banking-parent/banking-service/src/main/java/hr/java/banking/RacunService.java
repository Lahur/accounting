package hr.java.banking;

import hr.java.banking.entities.Racun;
import hr.java.banking.exceptions.BankingStatusException;

public interface RacunService extends BaseService<Racun> {
	
	Racun createRacun(Racun racun, String keycloakId) throws BankingStatusException;

}
