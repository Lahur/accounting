package hr.java.banking.impl;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.java.banking.KorisnikService;
import hr.java.banking.RacunService;
import hr.java.banking.SifraNamjeneService;
import hr.java.banking.StrankaService;
import hr.java.banking.entities.Korisnik;
import hr.java.banking.entities.Racun;
import hr.java.banking.entities.SifraNamjene;
import hr.java.banking.entities.Stranka;
import hr.java.banking.exceptions.BankingStatusException;
import hr.java.banking.repository.RacunRepository;

@Service
public class RacunServiceImpl extends BaseServiceImpl<Racun, RacunRepository> implements RacunService {
	
	private StrankaService strankaService;
	
	private KorisnikService korisnikService;

	
	@Autowired
	public RacunServiceImpl(RacunRepository repository, StrankaService strankaService,
			KorisnikService korisnikService) {
		super(repository);
		this.strankaService = strankaService;
		this.korisnikService = korisnikService;
	}







	@Override
	public Racun save(Racun object) throws BankingStatusException {
		Racun racun = new Racun();
		Optional<Stranka> optionalStranka = strankaService.findOne(object.getPrimatelj().getId());
		Stranka primatelj = null;
		if(optionalStranka.isPresent())
		{
			primatelj = optionalStranka.get();
		}
		else
		{
			optionalStranka = strankaService.findByIbanAndNaziv(object.getPrimatelj().getIban(), object.getPrimatelj().getNaziv());
			if(optionalStranka.isPresent())
			{
				primatelj = optionalStranka.get();
				racun.setPrimatelj(primatelj);
			}
			else
			{
				racun.setPrimatelj(strankaService.save(object.getPrimatelj()));
			}
		}
		optionalStranka = strankaService.findOne(object.getPrimatelj().getId());
		Stranka uplatitelj = null;
		if(optionalStranka.isPresent())
		{
			uplatitelj = optionalStranka.get();
		}
		else
		{
			optionalStranka = strankaService.findByIbanAndNaziv(object.getUplatitelj().getIban(), object.getPrimatelj().getNaziv());
			if(optionalStranka.isPresent())
			{
				uplatitelj = optionalStranka.get();
				racun.setPrimatelj(uplatitelj);
			}
			else
			{
				racun.setUplatitelj(strankaService.save(object.getPrimatelj()));
			}
		}
		racun.setIban(object.getPrimatelj().getIban());
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
		Racun racun = new Racun();
		Optional<Stranka> optionalStranka = strankaService.findOne(object.getPrimatelj().getId());
		Stranka primatelj = null;
		if(optionalStranka.isPresent())
		{
			primatelj = optionalStranka.get();
		}
		else
		{
			optionalStranka = strankaService.findByIbanAndNaziv(object.getPrimatelj().getIban(), object.getPrimatelj().getNaziv());
			if(optionalStranka.isPresent())
			{
				primatelj = optionalStranka.get();
				racun.setPrimatelj(primatelj);
			}
			else
			{
				racun.setPrimatelj(strankaService.save(object.getPrimatelj()));
			}
		}
		optionalStranka = strankaService.findOne(object.getPrimatelj().getId());
		Stranka uplatitelj = null;
		if(optionalStranka.isPresent())
		{
			uplatitelj = optionalStranka.get();
		}
		else
		{
			optionalStranka = strankaService.findByIbanAndNaziv(object.getUplatitelj().getIban(), object.getPrimatelj().getNaziv());
			if(optionalStranka.isPresent())
			{
				uplatitelj = optionalStranka.get();
				racun.setPrimatelj(uplatitelj);
			}
			else
			{
				racun.setUplatitelj(strankaService.save(object.getPrimatelj()));
			}
		}
		racun.setIban(object.getPrimatelj().getIban());
		racun.setIznos(object.getIznos());
		racun.setModel(object.getModel());
		racun.setPozivNaBroj(object.getPozivNaBroj());
		racun.setUplatnica(object.getUplatnica());
		racun.setOpis(object.getOpis());
		racun.setValuta(object.getValuta());
		
		return super.save(racun);
		
		
		
	}







	@Override
	public Racun createRacun(Racun object, String keycloakId) throws BankingStatusException {
		Korisnik korisnik = korisnikService.findByKeycloakId(keycloakId).get();
		Racun racun = new Racun();
		Optional<Stranka> optionalStranka = strankaService.findOne(object.getPrimatelj().getId());
		Stranka primatelj = null;
		if(optionalStranka.isPresent())
		{
			primatelj = optionalStranka.get();
		}
		else
		{
			optionalStranka = strankaService.findByIbanAndNaziv(object.getPrimatelj().getIban(), object.getPrimatelj().getNaziv());
			if(optionalStranka.isPresent())
			{
				primatelj = optionalStranka.get();
				racun.setPrimatelj(primatelj);
			}
			else
			{
				racun.setPrimatelj(strankaService.save(object.getPrimatelj()));
			}
		}
		optionalStranka = strankaService.findOne(object.getPrimatelj().getId());
		Stranka uplatitelj = null;
		if(optionalStranka.isPresent())
		{
			uplatitelj = optionalStranka.get();
		}
		else
		{
			optionalStranka = strankaService.findByIbanAndNaziv(object.getUplatitelj().getIban(), object.getPrimatelj().getNaziv());
			if(optionalStranka.isPresent())
			{
				uplatitelj = optionalStranka.get();
			}
			else
			{
				uplatitelj = optionalStranka.get();
				final String naziv = uplatitelj.getNaziv();
				Set<Stranka> stranke = korisnik.getStranke();
				stranke.add(uplatitelj);
				korisnik.setStranke(stranke);
				korisnikService.save(korisnik);
				racun.setUplatitelj(korisnik.getStranke().stream().filter(f -> f.getNaziv() == naziv).findFirst().get());
			}
		}
		racun.setIban(object.getPrimatelj().getIban());
		racun.setIznos(object.getIznos());
		racun.setModel(object.getModel());
		racun.setPozivNaBroj(object.getPozivNaBroj());
		racun.setUplatnica(object.getUplatnica());
		racun.setOpis(object.getOpis());
		racun.setValuta(object.getValuta());
		
		return super.save(racun);
	}
	
	

	

}
