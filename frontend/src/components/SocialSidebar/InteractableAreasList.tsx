import { Box, Heading, List, ListItem, OrderedList } from '@chakra-ui/react';
import React from 'react';
import {
  GenericInteractableAreaController,
  useInteractableAreaFriendlyName,
  useInteractableAreaOccupants,
} from '../../classes/interactable/InteractableAreaController';
import PlayerName from './PlayerName';
import { useActiveInteractableAreas } from '../../classes/TownController';

/**
 * A react component that displays a single interactable area.
 *
 * @param areaController The InteractableAreaController for the area to display
 * @returns JSX.Element representing the single interactable area
 */
function SingleInteractableArea({
  areaController,
}: {
  areaController: GenericInteractableAreaController;
}): JSX.Element {
  // Get friendly name and occupants using custom hooks
  const friendlyName = useInteractableAreaFriendlyName(areaController);
  const occupants = useInteractableAreaOccupants(areaController);

  return (
    <ListItem>
      <Heading as='h4'>{friendlyName}</Heading>
      <List>
        {occupants.map(occupant => {
          return (
            <ListItem key={occupant.id}>
              <PlayerName player={occupant} />
            </ListItem>
          );
        })}
      </List>
    </ListItem>
  );
}

/**
 * A react component that displays a list of all active interactable areas in the town.
 * The list is grouped by type of interactable area, with those groups sorted alphabetically
 * by the type name. Within each group, the areas are sorted first by the number of occupants
 * in the area, and then by the name of the area (alphanumerically).
 *
 * The list of interactable areas is represented as an ordered list, with each list item
 * containing the name of the area (in an H4 heading), and then a list of the occupants of the area, where
 * each occupant is shown as a PlayerName component.
 *
 * @returns A list of all active interactable areas in the town as per above spec
 */
export default function InteractableAreasList(): JSX.Element {
  const activeAreas = useActiveInteractableAreas();

  // Group the areas by type
  const activeAreasByType: { [key: string]: GenericInteractableAreaController[] } =
    activeAreas.reduce((acc, area) => {
      const type = area.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(area);
      return acc;
    }, {} as { [key: string]: GenericInteractableAreaController[] });

  // Sort the types alphabetically
  const sortedTypes = Object.keys(activeAreasByType).sort();

  return (
    <Box>
      <Heading as='h2' fontSize='l'>
        Active Areas:
      </Heading>
      {activeAreas.length === 0 ? (
        <>No active areas</>
      ) : (
        sortedTypes.map(type => (
          <Box key={type}>
            <Heading as='h3' fontSize='m'>
              {type + 's'}
            </Heading>
            <OrderedList>
              {activeAreasByType[type]
                .sort((a, b) => {
                  if (a.occupants.length !== b.occupants.length) {
                    return b.occupants.length - a.occupants.length;
                  }
                  return a.friendlyName.localeCompare(b.friendlyName, undefined, {
                    numeric: true,
                    sensitivity: 'base',
                  });
                })
                .map(area => (
                  <ListItem key={area.id}>
                    <SingleInteractableArea areaController={area} />
                  </ListItem>
                ))}
            </OrderedList>
          </Box>
        ))
      )}
    </Box>
  );
}
