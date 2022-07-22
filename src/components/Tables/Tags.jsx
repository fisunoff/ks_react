import React from 'react';
import { DataGrid, GridToolbarQuickFilter, GridActionsCellItem, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import NewTag from './NewTag';
import ViewTag from './ViewTag';
import "../modal.css";

const url = "http://fisunoff.pythonanywhere.com/api/tags/";




function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput) =>
                    searchInput
                        .split(',')
                        .map((value) => value.trim())
                        .filter((value) => value !== '')
                }
            />
        </Box>
    );
}

class Tags extends React.Component {
    state = {
        todos: [],
        error: "",
        show: false,
        edit_id: undefined,
    }

    DoUpdateAfterModal = async () => {
        this.componentDidMount();
    }

    DoUpdateAfterEdit = async () => {
        this.UpdateTable(this.state.edit_id);
    }

    DeleteRecord = async (id) => {
        const { token } = this.props;
        try {
            const result = await fetch(url + id + '/', {
                method: "DELETE",
                headers: {
                    'Authorization': 'Token ' + token
                }
            });
            this.componentDidMount();
        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            }
            )
        }
    }

    GoToRecord = async (id) => {
        this.setState({ edit_id: id });
    }

    columns = [
        {
            field: 'tag_title',
            headerName: 'Тэг',
            width: 200
        },
        {
            field: 'priority',
            headerName: 'Приоритет',
            width: 200
        },
        {
            field: 'active_tag',
            headerName: 'Активный тэг'
        },
        {
            field: 'actions',
            type: 'actions',
            getActions: (params) => [
                <>
                    <GridActionsCellItem icon={<DeleteIcon />} onClick={this.DeleteRecord.bind(this, params.id)} label="Delete" />
                    <GridActionsCellItem icon={<PreviewIcon />} onClick={this.GoToRecord.bind(this, params.id)} href="#viewModal" label="View" />
                </>
            ]
        }

    ]

    componentDidMount = async () => {
        const { token } = this.props;
        let todos = []
        try {
            const result = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': 'Token ' + token
                }
            })
            todos = await result.json();
        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }

        this.setState({
            todos: todos,
        })
    }

    UpdateTable = async (updated_id) => {
        let todos = this.state.todos;
        const { token } = this.props;
        try {
            const result = await fetch(url + updated_id + '/', {
                method: "GET",
                headers: {
                    'Authorization': 'Token ' + token
                }
            })
            let tmp = await result.json();
            debugger;
        } catch (err) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }


    render() {
        const { error, todos } = this.state;

        return <div className='records'>
            <h1>Список авторов</h1>
            <a href="#openModal"><button>Новый тэг</button></a>
            <div id="openModal" className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Новый тэг</h3>
                            <a href="#close" title="Close" className="close">×</a>
                        </div>
                        <div className="modal-body">
                            <NewTag token={this.props.token} update={this.DoUpdateAfterModal} className='modal-content' />
                        </div>
                    </div>
                </div>
            </div>

            {this.state.edit_id ? <>
                <div id="viewModal" className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">Просмотр и изменение записи</h3>
                                <a href="#closeview" title="Close" className="close">×</a>
                            </div>
                            <div className="modal-body">
                                <ViewTag token={this.props.token} viewId={this.state.edit_id} key={"view" + this.state.edit_id} update={this.DoUpdateAfterModal} />
                            </div>
                        </div>
                    </div>
                </div></> :
                <></>
            }
            <h2>{error}</h2>
            <DataGrid rows={todos} columns={this.columns} pageSize={20} rowsPerPageOptions={[20]}
                components={{ Toolbar: QuickSearchToolbar }} />
        </div>
    }
}

export default Tags;