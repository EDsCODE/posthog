import React, { useState } from 'react'
import { useValues } from 'kea'

import { EditAppUrls } from './EditAppUrls'
import { appEditorUrl } from './utils'
import { teamLogic } from 'scenes/teamLogic'
import { Modal, Button } from 'antd'

export function AppEditorLink({ actionId, style, className, children }) {
    const [modalOpen, setModalOpen] = useState(false)
    const { currentTeam } = useValues(teamLogic)

    return (
        <>
            <a
                href={appEditorUrl(actionId, currentTeam?.appUrls?.[0])}
                style={style}
                className={className}
                onClick={(e) => {
                    e.preventDefault()
                    setModalOpen(true)
                }}
            >
                {children}
            </a>
            <Modal
                visible={modalOpen}
                title={
                    actionId
                        ? 'Choose the domain on which to edit this action'
                        : 'Choose the domain on which to create this action'
                }
                footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
                onCancel={() => setModalOpen(false)}
            >
                <EditAppUrls actionId={actionId} allowNavigation={true} dismissModal={() => setModalOpen(false)} />
            </Modal>
        </>
    )
}
