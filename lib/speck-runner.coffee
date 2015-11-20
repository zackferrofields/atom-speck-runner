SpeckRunnerView = require './speck-runner-view'
{CompositeDisposable} = require 'atom'

module.exports = SpeckRunner =
  speckRunnerView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @speckRunnerView = new SpeckRunnerView(state.speckRunnerViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @speckRunnerView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'speck-runner:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @speckRunnerView.destroy()

  serialize: ->
    speckRunnerViewState: @speckRunnerView.serialize()

  toggle: ->
    console.log 'SpeckRunner was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
