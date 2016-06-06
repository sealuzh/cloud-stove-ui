import {Directive, Attribute, OnChanges, ElementRef} from '@angular/core';

@Directive({
    selector: 'cs-ingredient-map',
    properties: ['data']
})

export class IngredientMap implements OnChanges {

    data: {nodes: Array<any>, links: Array<any>};

    svg: any;
    force: any;
    color: any;

    constructor(elementRef: ElementRef, @Attribute('width') width: string, @Attribute('height') height: string) {

        let el: any = elementRef.nativeElement;
        let graph: any = d3.select(el);

        this.color = d3.scale.category20();
        this.force = d3.layout.force().gravity(0.8).charge(0).linkDistance(125).size([width, height]);
        this.svg = graph
            .append('svg')
            .attr('viewBox', '0 0 ' + width + ' ' + height)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .classed('svg-content-responsive', true);
    }

    render(newValue) {
        if (!newValue) {
            return;
        }

        this.force.nodes(this.data.nodes).links(this.data.links).start();

        let link = this.svg.selectAll('.link')
            .data(this.data.links)
            .enter().append('line')
            .attr('class', 'link')
            .style('stroke-width', '1')
            .style('stroke', '#909090');

        let node = this.svg.selectAll('.node')
            .data(this.data.nodes)
            .enter()
            .append('rect')
            .attr('class', 'node')
            .attr('width', 50)
            .attr('height', 25)
            .attr("transform", "translate(" + -25 + "," + -12 + ")")
            .style('fill', '#909090')
            .call(this.force.drag);

        node.append('title')
            .text(function (d) {
                return d.name;
            });

        this.force.on('tick', () => {

            link.attr('x1', function (d) {
                return d.source.x;
            }).attr('y1', function (d) {
                return d.source.y;
            }).attr('x2', function (d) {
                return d.target.x;
            }).attr('y2', function (d) {
                return d.target.y;
            });

            node//.each(this.collide())
                .attr('x', function (d) {
                    return d.x;
                })
                .attr('y', function (d) {
                    return d.y;
                });

        });


    }

    private overlap(a, b) {
        let height = 100;
        let width = 100;

        return (a.x < b.x < (a.x + width) && a.y < b.y < (a.y + height)) || (a.x < (b.x + width) < (a.x + width) && a.y < (b.y + height) < (a.y + height));
        // return (a.x < b.x < (a.x + a.width) && a.y < b.y < (a.y + a.height)) || (a.x < (b.x + b.width) < (a.x + a.width) && a.y < (b.y + b.height) < (a.y + a.height));
    }

    // Resolves collisions between d and all other circles.
    private collide() {
        let quadtree = d3.geom.quadtree(this.data.nodes);

        return (d) => {
            let nx1, nx2, ny1, ny2, padding;

            padding = 100;

            nx1 = d.x - padding;
            nx2 = d.x2 + padding;
            ny1 = d.y - padding;
            ny2 = d.y2 + padding;

            quadtree.visit((quad, x1, y1, x2, y2) => {
                let dx, dy;

                if (quad.point && (quad.point !== d)) {
                    if (this.overlap(d, quad.point)) {
                        dx = Math.min(d.x2 - quad.point.x, quad.point.x2 - d.x) / 2;
                        d.x -= dx;
                        quad.point.x += dx;
                        dy = Math.min(d.y2 - quad.point.y, quad.point.y2 - d.y) / 2;
                        d.y -= dy;
                        quad.point.y += dy;
                    }
                }

                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }

    ngOnChanges() {
        this.render(this.data);
    }
}
