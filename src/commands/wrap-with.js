const wrapWith = require('../utils/wrap-with');

const valueListenableBuilderSnippet = (widget) => {
  return `ValueListenableBuilder(
    valueListenable: $1,
    builder: (_, $1Value, child) {
        return ${widget};
    },
)`;
};


const providerConsumerBuilderSnippet = (widget) => {
  return `Consumer<$1>(
    builder: (_, $2, __) {
        return ${widget};
    },
)`;
};

const mobxObserverBuilderSnippet = (widget) => {
  return `Observer(
    builder: (_) {
        return ${widget};
    },
)`;
};

const layoutBuilderSnippet = (widget) => {
  return `LayoutBuilder(
    builder: (_, constrains) { 
        return ${widget};
    },
  )`;
};

const builderSnippet = (widget) => {
  return `Builder(
    builder: (context) { 
        return ${widget};
    },
  )`;
};

const obxSnippet = (widget) => {
  return `Obx(() { 
        return ${widget};
    }
  )`;
};

const getXSnippet = (widget) => {
  return `GetX<$1>(
    init: $1(),
    initState: (_) {},
    builder: (_) {
        return ${widget};
    },
)`;
};

const watchSignalsSnippet = (widget) => {
  return `Watch((_) {
        return ${widget};
    },
)`;
};


const wrapWithValueListenableBuilder = async () => wrapWith(valueListenableBuilderSnippet);
const wrapWithProviderConsumerBuilder = async () => wrapWith(providerConsumerBuilderSnippet);
const wrapWithMobXObserverBuilder = async () => wrapWith(mobxObserverBuilderSnippet);
const wrapWithLayoutBuilder = async () => wrapWith(layoutBuilderSnippet);
const wrapWithBuilder = async () => wrapWith(builderSnippet);
const wrapWithObxGetX = async () => wrapWith(obxSnippet);
const wrapWithGetx = async () => wrapWith(getXSnippet);
const wrapWithSignals = async () => wrapWith(watchSignalsSnippet);

module.exports = { wrapWithValueListenableBuilder, wrapWithProviderConsumerBuilder, wrapWithMobXObserverBuilder, wrapWithLayoutBuilder, wrapWithBuilder, wrapWithObxGetX, wrapWithGetx, wrapWithSignals };