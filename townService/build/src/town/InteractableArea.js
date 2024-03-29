export const PLAYER_SPRITE_WIDTH = 32;
export const PLAYER_SPRITE_HEIGHT = 64;
export default class InteractableArea {
    _id;
    _x;
    _y;
    _width;
    _height;
    _occupants = [];
    _townEmitter;
    get id() {
        return this._id;
    }
    get occupants() {
        return this._occupants;
    }
    get occupantsByID() {
        return this._occupants.map(eachPlayer => eachPlayer.id);
    }
    get isActive() {
        return this.occupants.length > 0;
    }
    get boundingBox() {
        return { x: this._x, y: this._y, width: this._width, height: this._height };
    }
    constructor(id, { x, y, width, height }, townEmitter) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._townEmitter = townEmitter;
    }
    add(player) {
        this._occupants.push(player);
        player.location.interactableID = this.id;
        this._townEmitter.emit('playerMoved', player.toPlayerModel());
        this._emitAreaChanged();
    }
    remove(player) {
        this._occupants = this._occupants.filter(eachPlayer => eachPlayer !== player);
        player.location.interactableID = undefined;
        this._townEmitter.emit('playerMoved', player.toPlayerModel());
        this._emitAreaChanged();
    }
    addPlayersWithinBounds(allPlayers) {
        allPlayers
            .filter(eachPlayer => this.contains(eachPlayer.location))
            .forEach(eachContainedPlayer => this.add(eachContainedPlayer));
    }
    contains(location) {
        return (location.x + PLAYER_SPRITE_WIDTH / 2 > this._x &&
            location.x - PLAYER_SPRITE_WIDTH / 2 < this._x + this._width &&
            location.y + PLAYER_SPRITE_HEIGHT / 2 > this._y &&
            location.y - PLAYER_SPRITE_HEIGHT / 2 < this._y + this._height);
    }
    overlaps(otherInteractable) {
        const toRectPoints = ({ _x, _y, _width, _height }) => ({
            x1: _x - PLAYER_SPRITE_WIDTH / 2,
            x2: _x + _width + PLAYER_SPRITE_WIDTH / 2,
            y1: _y - PLAYER_SPRITE_HEIGHT / 2,
            y2: _y + _height + PLAYER_SPRITE_HEIGHT / 2,
        });
        const rect1 = toRectPoints(this);
        const rect2 = toRectPoints(otherInteractable);
        const noOverlap = rect1.x1 >= rect2.x2 || rect2.x1 >= rect1.x2 || rect1.y1 >= rect2.y2 || rect2.y1 >= rect1.y2;
        return !noOverlap;
    }
    _emitAreaChanged() {
        this._townEmitter.emit('interactableUpdate', this.toModel());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RhYmxlQXJlYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90b3duL0ludGVyYWN0YWJsZUFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV0EsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0FBQ3RDLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztBQUV2QyxNQUFNLENBQUMsT0FBTyxPQUFnQixnQkFBZ0I7SUFFM0IsR0FBRyxDQUFpQjtJQUc3QixFQUFFLENBQVM7SUFHWCxFQUFFLENBQVM7SUFHWCxNQUFNLENBQVM7SUFHZixPQUFPLENBQVM7SUFHZCxVQUFVLEdBQWEsRUFBRSxDQUFDO0lBRzVCLFlBQVksQ0FBYztJQUVsQyxJQUFXLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsYUFBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQVcsV0FBVztRQUNwQixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5RSxDQUFDO0lBUUQsWUFBbUIsRUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLEVBQUUsV0FBd0I7UUFDM0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7SUFDbEMsQ0FBQztJQVlNLEdBQUcsQ0FBQyxNQUFjO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFZTSxNQUFNLENBQUMsTUFBYztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQU9NLHNCQUFzQixDQUFDLFVBQW9CO1FBQ2hELFVBQVU7YUFDUCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN4RCxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFhTSxRQUFRLENBQUMsUUFBd0I7UUFDdEMsT0FBTyxDQUNMLFFBQVEsQ0FBQyxDQUFDLEdBQUcsbUJBQW1CLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQzlDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsbUJBQW1CLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU07WUFDNUQsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDL0MsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUMvRCxDQUFDO0lBQ0osQ0FBQztJQVlNLFFBQVEsQ0FBQyxpQkFBbUM7UUFDakQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RSxFQUFFLEVBQUUsRUFBRSxHQUFHLG1CQUFtQixHQUFHLENBQUM7WUFDaEMsRUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLEdBQUcsbUJBQW1CLEdBQUcsQ0FBQztZQUN6QyxFQUFFLEVBQUUsRUFBRSxHQUFHLG9CQUFvQixHQUFHLENBQUM7WUFDakMsRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLEdBQUcsb0JBQW9CLEdBQUcsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFDSCxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUMsTUFBTSxTQUFTLEdBQ2IsS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQy9GLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDcEIsQ0FBQztJQU1TLGdCQUFnQjtRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBYUYifQ==