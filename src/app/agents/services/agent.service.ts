import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../interfaces/agent';
import { map, tap, mergeAll, mergeMap, filter, toArray } from 'rxjs/operators';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private agentURL = 'http://stagingrefdata.studygroup.com/Agents/ActiveWithCountries';
  // private params = new HttpParams();

  constructor(private http: HttpClient) {}

  getAgents(): Observable<Agent[]> {
    console.log('Getting list of agents from the server.');
    // const params =  this.params.set('agentCountryId', countryId);
    return this.http.get<Agent[]>(this.agentURL).pipe(
      map((res: any) => {
        // console.log('agents', res.AgentData);
        if (res.AgentData) {
          return res.AgentData;
        }
        return null;
      })
    );
  }

  getCountries(): Observable<Country[]> {
    console.log('Getting all agent countries from the server.');
    return this.http.get<Country[]>(this.agentURL).pipe(
      map((res: any) => {
        // console.log('countries', res.CountryData);
        if (res.CountryData) {
          return res.CountryData;
        }
        return null;
      })
    );
  }
}
