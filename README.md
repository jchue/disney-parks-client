# Disney Parks Project Client

## Overview

This is a personal project that I'm using to learn about creating a RESTful API with Express and Mongoose as an ODM for MongoDB (a "MEN" stack, if you will).

The concept is a hierarchical timeline of the Disney parks and the attractions contained within as sub-entities. The data describes both the parent-child relationships between entities (e.g., Space Mountain is contained within Tomorrowland, which is contained within Disneyland, which is contained within Disneyland Resort.) as well as the predecessor-successor relationships (e.g., Star Tours replaced Adventure Thru Inner Space, which replaced the Monsanto House of Chemistry.)

Granted, the latter relationships may pose a more difficult problem, since succession is not always straightforward. In other words, it can be defined as the replacement of an attraction within a physical space or a more conceptual/spiritual replacement. Additionally, when dealing with physical succession, a predecessor may be larger and may be replaced by multiple successors, and vice-versa. These issues are going to need to be analyzed further before a suitable data model is finalized.

The API for accessing the data is housed in a separate repository [here](https://github.com/jchue/disney-parks-api).

## Definitions

- **basis:** length of longest event (in days)
- **horizon:** rightmost/latest date on the timeline
- **epoch:** start date of oldest event (i.e., the leftmost/first date on the timeline)
- **increment:** number of years per notch
- **clump:** a logical predecessor/successor grouping of related attractions/events

## Calculations

Everything is normalized as a percentage of the **basis**, which is the duration of the longest event displayed.

### Sizing

1. Calculate the duration of the current object (in days)
1. Normalize the duration by dividing by the basis
1. Multiply by 100 to convert to a percentage

(The longest event in the timeline sets the context, because it calculates to 100%, thus establishing the basis.)

### Positioning

1. Calculate the number of days from the epoch to the start date of the current object
1. Normalize by dividing by the basis
1. Multiply by 100 to convert to a percentage

Positioning is based on the distance from the left side of the timeline.

## Development

### Prerequisites

- Node.js

### Environment Variables

Variable|Description
-|-
VUE_APP_API|URL of the data API
VUE_APP_TITLE|Site title that will appear on HTML pages

### Install dependencies

```
npm install
```

### Start development server

```
npm run serve
```

## Disclaimer

This project is in no way associated with The Walt Disney Company or its affiliated/subsidiary entities.
