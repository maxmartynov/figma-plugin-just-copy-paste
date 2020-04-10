console.log('figma-plugin-smart-copy-paste: start')

let selectedItems = figma.currentPage.selection
let root = figma.root

if (selectedItems.length === 0) {
  figma.closePlugin('No object selected.')
}

if (figma.command === 'copy') {
  smartCopy()
}

if (figma.command === 'paste') {
  smartPaste()
}

function smartCopy () {
  const ids = selectedItems.map((item: any) => item.id)
  root.setPluginData('clipboardAction', 'copy')
  root.setPluginData('clipboardItemsIds', ids.join('|'))

  figma.closePlugin('Copied')
}

function smartPaste () {
  const ids = root.getPluginData('clipboardItemsIds').split('|')

  const selectedIds = selectedItems.map((item: any) => item.id)
  let selectedItem: any = selectedItems.slice()[0]
  const pastedItems = []

  const notification = figma.notify('Processing...', {timeout: 32})

  for (let id of ids) {
    const clipboardItem: any = figma.getNodeById(id)

    if (!clipboardItem) {
      figma.notify(`ERROR: Cannot find item to copy: '${id}'`)
    }

    let parent = selectedItem

    if (selectedIds.indexOf(clipboardItem.id) > -1) {
      parent = undefined
    }

    const newParent: any = parent
      ? figma.getNodeById(parent.id)
      : clipboardItem.parent

    pastedItems.push(_pasteItem(clipboardItem, newParent))
  }

  figma.currentPage.selection = pastedItems

  setTimeout(() => notification.cancel(), 1000)
  figma.closePlugin('Pasted')
}

function _pasteItem (item, parent) {
  if (!item) {
    console.error('Could not paste item. Item is undefined.')
    return
  }
  if (!parent) {
    console.error('Could not paste item. Parent is undefined.')
    return
  }

  const _parent = typeof parent.appendChild === 'function'
    ? parent
    : parent.parent

  const newItem: any = item.clone()
  const point: Point = getPositionRelativeToNode(item, _parent)

  _parent.appendChild(newItem)
  newItem.x = point.x
  newItem.y = point.y

  return newItem
}

function getPositionRelativeToNode (source, target): Point {
  let _source = source
  let _target = target

  const isInParent = checkIfNodeIsInParent(_source, _target)

  if (!isInParent) {
    _source = target
    _target = source
  }

  let point: Point = {x: _source.x, y: _source.y}
  let _parent = _source.parent

  if (isInParent) {
    while (_parent) {
      const isNotLast = _target.id !== _parent.id
      if (isNotLast) {
        point.x += _parent.x || 0
        point.y += _parent.y || 0
      }
      _parent = isNotLast ? _parent.parent : undefined
    }
  } else {
    point.x *= -1
    point.y *= -1

    while (_parent) {
      const isNotLast = _target.parent.id !== _parent.id

      if (isNotLast) {
        point.x -= _parent.x || 0
        point.y -= _parent.y || 0
      }
      _parent = isNotLast ? _parent.parent : undefined
    }

    point.x += _target.x || 0
    point.y += _target.y || 0
  }

  return point
}

function checkIfNodeIsInParent (child, parent) {
  const targetParent = parent.children ? parent : parent.parent
  let _parent = child.parent

  while (_parent) {
    if (targetParent.id === _parent.id) return true
    _parent = _parent.parent
  }

  return false
}

figma.closePlugin('Smart Copy Plugin Exit')
