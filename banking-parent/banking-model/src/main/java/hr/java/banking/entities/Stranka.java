package hr.java.banking.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@SuppressWarnings("serial")
@Table(name="stranka")
@Data
@EqualsAndHashCode(callSuper=false)
@Entity
public class Stranka extends BaseModel {
	
	@Column(name="naziv")
	private String naziv;
	
	@Column(name="iban")
	private String iban;
	
	@ManyToOne
	@JoinColumn(name = "adresa_id", referencedColumnName = "id")
	private Adresa adresa;
	

}
