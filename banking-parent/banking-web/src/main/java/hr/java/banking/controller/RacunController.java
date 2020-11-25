package hr.java.banking.controller;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import hr.java.banking.RacunService;
import hr.java.banking.entities.Racun;
import hr.java.banking.exceptions.BankingStatusException;

@RestController
@RequestMapping("api/racun")
public class RacunController {
	
	@Autowired
	private RacunService racunService;
	
	@GetMapping
	public Set<Racun> getAll() {
		return new HashSet<Racun>((Collection) racunService.getAll());
	}
	
	@PostMapping
	public Racun save(@RequestBody Racun racun) {
		Racun rac = null;
		try {
			rac = this.racunService.createRacun(racun, SecurityContextHolder.getContext().getAuthentication().getName());
		} catch (BankingStatusException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getCode()), e.getMessage());
		}
		
		return rac;
		
	}

}
