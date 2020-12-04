<template>
  <div class="about">
    <div class="wrapper">
      <h1>About</h1>

      <p>This is a personal project that I'm using to learn about creating a RESTful API
        with Express and Mongoose as an ODM for MongoDB (a "MEN" stack, if you will).</p>

      <p>The concept is a hierarchical timeline of the Disney parks and the attractions
        contained within as sub-entities. The data describes both the parent-child relationships
        between entities (e.g., Space Mountain is contained within Tomorrowland, which is contained
        within Disneyland, which is contained within Disneyland Resort.) as well as the
        predecessor-successor relationships (e.g., Star Tours replaced Adventure Thru Inner Space,
        which replaced the Monsanto House of Chemistry.)</p>

      <p>Granted, the latter relationships may pose a more difficult problem, since succession
        is not always straightforward. In other words, it can be defined as the replacement
        of an attraction within a physical space or a more conceptual/spiritual replacement.
        Additionally, when dealing with physical succession, a predecessor may be larger
        and may be replaced by multiple successors, and vice-versa. These issues are going to need
        to be analyzed further before a suitable data model is finalized.</p>
    </div>
  </div>
</template>
