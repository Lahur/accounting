package hr.java.banking.impl;

import org.springframework.beans.factory.annotation.Autowired;

import hr.java.banking.AdresaService;
import hr.java.banking.entities.Adresa;
import hr.java.banking.repository.AdresaRepository;

public class AdresaServiceImpl extends BaseServiceImpl<Adresa, AdresaRepository> implements AdresaService {

	@Autowired
	public AdresaServiceImpl(AdresaRepository repository) {
		super(repository);
	}

	@Override
	public Adresa update(Adresa object) {
		Adresa adresa = super.findOne(object.getId()).get();
		adresa.setAdresa(object.getAdresa());
		adresa.setGrad(object.getGrad());
		
		return adresa;
		
	}

	

}
