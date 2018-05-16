'use strict';

//
// ─── COMMAND EXECUTION ──────────────────────────────────────────────────────────
//

module.exports = async function collectCategories (storeCode, options) {
  try {
    const { verbose, queue: useQueue, optionalValue, requiredValue, items } = options;

    // TODO: Register all types of examples for command.
    // TODO: Log all types of examples of options.

    console.log({ storeCode, verbose, useQueue, optionalValue, requiredValue, items });

    if (useQueue)
      await publishJob(storeCode);
    else
      await executeInstantly(storeCode, verbose);

  } catch (err) {
    console.error(err);
  }
};

//
// ─── COMMAND REGISTRY ───────────────────────────────────────────────────────────
//

module.exports.registry = {
  name       : 'categories:collect [storeCode]',
  description: 'Collect all categories of all stores, or only the provided store code.',
  options    : [
    {
      flag       : '-v, --verbose',
      description: 'Log more details.'
    },
    {
      flag       : '-q, --queue',
      description: 'Push job into message queue instead of execute instantly.'
    },
    {
      flag        : '-o, --optional-value [value]',
      description : 'Just a flag, named "optional-list", for input demonstration.',
      regex       : /^(large|medium|small)$/i,
      defaultValue: 'undefined or wrong'
    },
    {
      flag        : '-r, --required-value <value>',
      description : 'Just a flag, named "required-list", for input demonstration.',
      regex       : /^(large|medium|small)$/i,
      defaultValue: 'wrong'
    },
    {
      flag       : '-i, --items <itemName>',
      description: 'Add a list of items',
      coercion (itemName, items) {
        items.push(itemName);
        return items;
      },
      initValue: []
    }
  ]
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

/**
 * Publish a new job into message queue to let background process crawl categories.
 *
 * @param {string} storeCode Code of the store to be published along with the job.
 */
async function publishJob (storeCode) {
  // TODO: Implementation
}

/**
 * Crawl categories immediately when command is called.
 *
 * @param {string} storeCode Code of the store to be crawled. If `undefined` or `null`, crawl all stores.
 * @param {boolean} verbose Log more details if `true`.
 */
async function executeInstantly (storeCode, verbose) {
  // TODO: Implementation
}
