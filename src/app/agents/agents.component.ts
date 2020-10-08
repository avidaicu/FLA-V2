import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AgentService } from './services/agent.service';
import { Country } from './interfaces/country';
import { Observable} from 'rxjs';
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
  filteredCities$: Country[] = [];
  countryName$;

  agents$: Agent[] = [];
  filteredAgents$: Agent[] = [];

  agentCountry$;

  constructor(private agentService: AgentService) {
    // this.countries$ = this.agentService.getCountries();
    // this.agents$ = this.agentService.getAgents();
  }

  ngOnInit() {
    this.agentService.getAgents()
    .subscribe(agents => {
      this.agents$ = agents;
    });

    this.agentService.getCountries()
    .subscribe(countries => {
      this.countries$ = countries;
      // this.filteredCities$ = countries.map(x => x.Cities);
    });
  }

  onCountrySelect(country) {
    this.agentService.getCountries()
    .subscribe(countries => {
      console.log('country.Cities', country.Cities);

      this.filteredCities$ = (country.Cities) ?
        this.countries$.filter(p => p.Cities === country.Cities) :
        this.countries$;
      // this.filteredCities$ = countries.map(x => x.Cities);

      console.log('this.filteredCities$', this.filteredCities$);

      // this.cities$ = countries.map(x => x.City);
      // console.log('this.cities$', this.cities$);
    });
    this.agentService.getAgents()
      .subscribe(agents => {
        console.log('country.Name', country.Name);

        this.filteredAgents$ = (country.Name) ?
        this.agents$.filter(p => p.Country === country.Name) :
        this.agents$;
        console.log('this.filteredAgents$', this.filteredAgents$);
    });
  }

  onCitySelect(city) {
    console.log('city', city);
    // this.subscription1 = this.agentService.getCountries()
    // .subscribe(countries => {
    //   this.countries$ = countries;
    //   this.cities$ = countries.map(x => x.Cities);
    // });
    // this.subscription2 = this.agentService.getAgents()
    //   .subscribe(agents => {
    //     console.log('country.Name', country.Name);
    //     this.filteredAgents$ = this.agents$.filter(p => p.Country === country.Name);
    //     console.log('this.filteredAgents$', this.filteredAgents$);
    // });
  }

  toggle() {
    this.parentDetails = !this.parentDetails;
  }

}
