package hr.java.banking;

import hr.java.banking.entities.Grad;

public interface GradService extends BaseService<Grad> {
	
	Grad findByPost(String post);

}
