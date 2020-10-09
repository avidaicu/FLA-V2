import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AgentService } from './services/agent.service';
import { Country } from './interfaces/country';
import { Agent } from './interfaces/agent';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {

  parentDetails = false;

  countrySearch = new FormControl();
  citySearch = new FormControl();

  countries$: Country[] = [];
  cities$: Country[] = [];

  agents$: Agent[] = [];
  filteredAgents$: Agent[] = [];
  filteredCountryAgents$: Agent[] = [];

  @ViewChild('country', {static: false}) nameInputRef: ElementRef;

  constructor(private agentService: AgentService) {
  }

  ngOnInit() {
    this.agentService.getAgents()
      .subscribe(agents =>
        this.agents$ = agents
      );

    this.agentService.getCountries()
      .subscribe(countries =>
        this.countries$ = countries
      );
  }

  onCountrySelect(country) {
    this.agentService.getCountries()
    .subscribe(countries => {
      this.countries$ = countries;
      this.cities$ = country.Cities;

      this.filteredAgents$ = (country.Name) ?
      this.agents$.filter(p => p.Country === country.Name) :
      this.agents$;

    });
    this.citySearch.reset();
  }

  onCitySelect(city) {
      this.filteredAgents$ = (city) ?
      this.agents$.filter(p => p.City === city) :
      this.agents$;

      this.citySearch.valueChanges.subscribe(x => {
        if(x === '') {
          this.filteredAgents$ = (this.nameInputRef.nativeElement.value) ?
          this.agents$.filter(p => p.Country === this.nameInputRef.nativeElement.value) :
          this.agents$;        }
    });
  }

  toggle() {
    this.parentDetails = !this.parentDetails;
  }

}
