import {OnInit, Component} from '@angular/core';
import {OnActivate, RouteSegment, Router, ROUTER_DIRECTIVES} from '@angular/router';

import {Application} from '../dtos/application.dto';
import {Ingredient} from '../dtos/ingredient.dto';
import {Constraint} from '../dtos/constraint.dto';

import {ApplicationMap} from './application-map.component';
import {ApplicationService} from '../services/application';

@Component({
    template: require('./application-detail.component.html'),
    directives: [ROUTER_DIRECTIVES, ApplicationMap]
})

export class ApplicationDetailComponent implements OnActivate, OnInit {

    application: Application;
    applicationData;

    public boundIngredientClickedCallback: Function;

    constructor(private _applicationService: ApplicationService, private router: Router) {

        // TODO: construct dynamically
        this.applicationData = {'nodes': [], 'links': []};

    }

    public ingredientClickedCallback(ingredientObj) {
      this.router.navigate(['/ingredients', ingredientObj.id]);
    }

    public ngOnInit(){
      this.boundIngredientClickedCallback = this.ingredientClickedCallback.bind(this);
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadIngredient(id);
    }

    loadIngredient(id: string) {
        this._applicationService.get(id, '_embed=ingredients').subscribe(
            application => {
              this.application = application;

              let nodeMap: Map<number, number> = new Map<number, number>();

              // add nodes
              for (let ingredient of this.application.ingredients) {
                this.applicationData.nodes.push(ingredient);
                nodeMap.set(ingredient.id, this.applicationData.nodes.indexOf(ingredient));
              }

              // add links/constraints
              for (let ingredient of this.application.ingredients) {
                if (ingredient.constraints) {
                  for (let constraint of ingredient.constraints) {
                    // add dependency constraint to map
                    if (constraint.type === 'dependency') {
                      this.applicationData.links.push({'source': nodeMap.get(constraint.source_id), 'target': nodeMap.get(constraint.target_id), 'value': 1});
                    }
                  }
                }
              }

            },
            error => console.log(error)
        );
    }

}
