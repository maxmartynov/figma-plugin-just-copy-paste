const selectedItems: ReadonlyArray<SceneNode> = figma.currentPage.selection
const root: DocumentNode = figma.root

main()



function main (): void {
  if (selectedItems.length === 0) {
    return figma.closePlugin('No layer selected')
  }

  switch (figma.command as string) {
    case 'copy': {
      return smartCopy()
    }
    case 'paste': {
      return smartPaste()
    }
  }

  figma.closePlugin('Smart Copy Plugin Exit')
}

function smartCopy () {
  const ids: string[] = selectedItems.map((item: SceneNode) => item.id)
  root.setPluginData('clipboardAction', 'copy' as string)
  root.setPluginData('clipboardItemsIds', ids.join('|') as string)

  figma.closePlugin('Copied')
}

function smartPaste (): void {
  const ids: string[] = root.getPluginData('clipboardItemsIds').split('|')
  const selectedIds: string[] = selectedItems.map((item: SceneNode) => item.id)
  const selectedItem: SceneNode|undefined = selectedItems.slice()[0]
  const pastedItems: SceneNode|BaseNode[] = []
  const notification: NotificationHandler = figma
    .notify('Processing...', {timeout: 32})

  for (let id of ids) {
    const clipboardItem: BaseNode = figma.getNodeById(id)

    if (!clipboardItem) {
      figma.notify(`ERROR: Cannot find item to copy: '${id}'`)
    }

    let target: BaseNode|undefined = selectedIds.indexOf(clipboardItem.id) > -1
      ? undefined
      : selectedItem

    target = target ? figma.getNodeById(target.id) : clipboardItem.parent

    const pastedItem: SceneNode|BaseNode|undefined = _pasteItem(
      clipboardItem,
      target
    )

    pastedItem && pastedItems.push(pastedItem)
  }

  figma.currentPage.selection = pastedItems as SceneNode[]

  setTimeout(() => notification.cancel(), 1000)
  figma.closePlugin('Pasted')
}

function _pasteItem (
  item: SceneNode|BaseNode,
  target: SceneNode|BaseNode): SceneNode|BaseNode|undefined {

  if (!item) {
    figma.notify('ERROR: Could not paste item. Item is undefined.')
    return
  }
  if (!target) {
    figma.notify('ERROR: Could not paste item. Target is undefined.')
    return
  }

  const point: Point = getPositionRelativeToNode(item, target)
  let index: number = target.parent.children
    .findIndex((itm: SceneNode|BaseNode) => itm.id === target.id) + 1

  if (index < 0 || index > target.parent.children.length) {
    index = target.parent.children.length
  }

  const newItem: SceneNode = (item as SceneNode).clone()
  target.parent.insertChild(index, newItem)
  newItem.x = point.x
  newItem.y = point.y

  return newItem
}

function getParentsList (
  node: SceneNode|BaseNode): Map<string, SceneNode|BaseNode> {

  const map: Map<string, SceneNode|BaseNode> = new Map()

  if (!node) return map

  let _parent: SceneNode|BaseNode|undefined = node.parent

  while (_parent) {
    map.set(_parent.id, _parent)
    _parent = _parent.id === root.id ? undefined : _parent.parent
  }

  return map
}

function getPositionRelativeToNode (
  source: SceneNode|BaseNode,
  target: SceneNode|BaseNode
  ): Point {

  const parents1: Map<string, SceneNode|BaseNode> = getParentsList(source)
  const parents2: Map<string, SceneNode|BaseNode> = getParentsList(target)

  let point: Point = {
    x: (source as SceneNode).x,
    y: (source as SceneNode).y
  }
  let commonParent: any

  for (let [id, parent] of parents1 as Map<string, any>) {
    if (parents2.get(id)) {
      commonParent = parent
      break
    }
    point.x += parent.x || 0
    point.y += parent.y || 0
  }

  const keys: string[] = Array.from(parents2.keys())
  let i: number = keys.indexOf(commonParent.id) - 1

  for (;i >= 0; i--) {
    const id: string = keys[i]
    const parent: SceneNode|BaseNode = parents2.get(id) as SceneNode

    point.x -= parent.x || 0
    point.y -= parent.y || 0
  }

  return point
}
