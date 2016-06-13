import {OnInit, Component} from '@angular/core';
import {OnActivate, RouteSegment, Router, ROUTER_DIRECTIVES} from '@angular/router';

import {Ingredient} from '../dtos/ingredient.dto';

import {ApplicationMapDirective} from './application-map.component';
import {IngredientService} from '../services/ingredient';

import {MarkdownDirective} from '../shared/markdown.component';

@Component({
    template: require('./application-detail.component.html'),
    styles: [require('./application-detail.component.scss')],
    directives: [ROUTER_DIRECTIVES, MarkdownDirective, ApplicationMapDirective]
})

export class ApplicationDetailComponent implements OnActivate, OnInit {

    application: Ingredient;
    applicationData;

    public boundIngredientClickedCallback: Function;

    constructor(private _ingredientService: IngredientService, private router: Router) {

        // TODO: construct dynamically
        this.applicationData = { 'nodes': [], 'links': [] };

    }

    public ingredientClickedCallback(ingredientObj) {
        this.router.navigate(['/ingredients', ingredientObj.id]);
    }

    public ngOnInit() {
        this.boundIngredientClickedCallback = this.ingredientClickedCallback.bind(this);
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadIngredient(parseInt(id));
    }

    loadIngredient(id: number) {
        this._ingredientService.get(id, null).subscribe(
            application => {
                this.application = application;

                let nodeMap: Map<number, number> = new Map<number, number>();

                // add nodes
                for (let ingredient of this.application.children) {
                    this.applicationData.nodes.push(ingredient);
                    nodeMap.set(ingredient.id, this.applicationData.nodes.indexOf(ingredient));
                }

                // add links/constraints
                this.addConstraintsToMap(application, nodeMap);

            },
            error => console.log(error)
        );
    }

    addConstraintsToMap(ingredient: any, nodeMap: Map<number, number>) {
        if (ingredient.children) {
            for (let child of ingredient.children) {
                this.addConstraintsToMap(child, nodeMap);
                for (let constraint of child.constraints) {
                    if (constraint.type === 'DependencyConstraint') {
                        this.applicationData.links.push(
                            {
                                'source': nodeMap.get(constraint.source_id),
                                'target': nodeMap.get(constraint.target_id),
                                'value': 1
                            }
                        );
                    }
                }
            }
        }
    }

    copyIngredient(id: number) {
      this._ingredientService.copy(id).subscribe(
        copiedIngredient => this.application.children.push(copiedIngredient),
        error => console.log(error)
      );
    }

}
