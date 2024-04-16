import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { NewGamePanel } from '../components/organisms/NewGamePanel'

export const NewGamePage = () => {
    const [hiddenRightPanel, setHiddenRightPanel] = React.useState(false)

    return (
        <MainTemplate title="Game">
            <NewGamePanel hidden={hiddenRightPanel} setHidden={setHiddenRightPanel} />
        </MainTemplate>
    )
}
