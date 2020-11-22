package hr.java.banking.repository;

import java.util.Optional;

import hr.java.banking.entities.Stranka;

public interface StrankaRepository extends BaseRepository<Stranka> {
	
	Optional<Stranka> findByNaziv(String naziv);
	
	Optional<Stranka> findByIbani_Iban(String iban);

}
