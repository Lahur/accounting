package hr.java.banking.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@SuppressWarnings("serial")
@Table(name="iban")
@Data
@EqualsAndHashCode(callSuper=false)
@Entity
public class Iban extends BaseModel {
	
	@Column(name = "iban")
	private String iban;
	
	@Column(name = "opis")
	private String opis;

}
