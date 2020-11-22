package hr.java.banking.impl;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import hr.java.banking.IbanService;
import hr.java.banking.RacunService;
import hr.java.banking.SifraNamjeneService;
import hr.java.banking.StrankaService;
import hr.java.banking.entities.Racun;
import hr.java.banking.entities.SifraNamjene;
import hr.java.banking.entities.Stranka;
import hr.java.banking.exceptions.BankingStatusException;
import hr.java.banking.repository.RacunRepository;

public class RacunServiceImpl extends BaseServiceImpl<Racun, RacunRepository> implements RacunService {
	
	private StrankaService strankaService;

	@Autowired
	public RacunServiceImpl(RacunRepository repository, StrankaService strankaService,
			SifraNamjeneService sifraNamjeneService) {
		super(repository);
		this.strankaService = strankaService;
	}



	



	@Override
	public Racun save(Racun object) throws BankingStatusException {
		Racun racun = new Racun();
		Optional<Stranka> optionalStranka = strankaService.findByIban(racun.getIban());
		Stranka stranka = null;
		if(optionalStranka.isPresent())
		{
			stranka = optionalStranka.get();
		}
		else
		{
			throw new BankingStatusException(404, "Stranka s određenim iban-om ne postoji");
		}
		if(!stranka.getId().equals(object.getUplatitelj().getId()))
		{
			throw new BankingStatusException(400, "Specificirani iban ne postoji");
		}
		racun.setIban(object.getIban());
		racun.setPrimatelj(object.getPrimatelj());
		racun.setUplatitelj(object.getUplatitelj());
		racun.setIznos(object.getIznos());
		racun.setModel(object.getModel());
		racun.setPozivNaBroj(object.getPozivNaBroj());
		racun.setUplatnica(object.getUplatnica());
		racun.setOpis(object.getOpis());
		racun.setValuta(object.getValuta());
		
		return super.save(racun);
	}







	@Override
	public Racun update(Racun object) throws BankingStatusException {
		Racun racun = null;
		Optional<Racun> optionalRacun = super.findOne(object.getId());
		if(optionalRacun.isPresent())
		{
			racun = optionalRacun.get();
		}
		else
		{
			throw new BankingStatusException(404, "Racun s određenim identifikacijskim brojem ne postoji");
		}
		
		Optional<Stranka> optionalStranka = strankaService.findByIban(racun.getIban());
		Stranka stranka = null;
		if(optionalStranka.isPresent())
		{
			stranka = optionalStranka.get();
		}
		else
		{
			throw new BankingStatusException(404, "Stranka s određenim iban-om ne postoji");
		}
		if(!stranka.getId().equals(object.getUplatitelj().getId()))
		{
			throw new BankingStatusException(400, "Specificirani iban ne postoji");
		}
		racun.setIban(object.getIban());
		racun.setPrimatelj(object.getPrimatelj());
		racun.setUplatitelj(object.getUplatitelj());
		racun.setIznos(object.getIznos());
		racun.setModel(object.getModel());
		racun.setPozivNaBroj(object.getPozivNaBroj());
		racun.setUplatnica(object.getUplatnica());
		racun.setOpis(object.getOpis());
		racun.setValuta(object.getValuta());
		
		return super.save(racun);
		
		
		
	}
	
	

	

}
