import { useRef, useState } from 'react'

const initialDocuments = [
	{ id: 1, name: 'Cell Biology - lecture notes', type: 'PDF', subject: 'Biology', size: '2.4 MB', added: 'Today' },
	{ id: 2, name: 'Quadratic equations practice', type: 'DOCX', subject: 'Mathematics', size: '840 KB', added: 'Yesterday' },
	{ id: 3, name: 'Climate systems summary', type: 'PDF', subject: 'Geography', size: '1.8 MB', added: 'Sep 28' },
	{ id: 4, name: 'Organic chemistry - chapter 6', type: 'PDF', subject: 'Chemistry', size: '3.1 MB', added: 'Sep 26' },
]

const filters = ['All files', 'PDFs', 'Documents']

function formatSize(bytes) {
	return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function Documents() {
	const inputRef = useRef(null)
	const [documents, setDocuments] = useState(initialDocuments)
	const [filter, setFilter] = useState('All files')
	const [query, setQuery] = useState('')
	const [selectedDocument, setSelectedDocument] = useState(null)
	const visibleDocuments = documents.filter((document) => {
		const matchesQuery = `${document.name} ${document.subject} ${document.type}`.toLowerCase().includes(query.toLowerCase())
		const matchesFilter = filter === 'All files' || (filter === 'PDFs' ? document.type === 'PDF' : document.type !== 'PDF')
		return matchesQuery && matchesFilter
	})

	function addFiles(event) {
		const files = Array.from(event.target.files ?? [])
		if (!files.length) return
		setDocuments((current) => [...files.map((file) => ({
			id: `${file.name}-${file.lastModified}`,
			name: file.name.replace(/\.[^.]+$/, ''),
			type: file.name.split('.').pop()?.toUpperCase() ?? 'FILE',
			subject: 'Unsorted',
			size: formatSize(file.size),
			added: 'Just now',
		})), ...current])
		event.target.value = ''
	}

	return (
		<main className="main-content">
			<header className="topbar">
				<div className="breadcrumb">Workspace <span>/</span> <strong>Documents</strong></div>
				<div className="topbar-actions"><label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search documents" placeholder="Search documents..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><button className="icon-button notification-button" type="button" aria-label="Notifications">♧<span /></button><span className="top-avatar">A</span></div>
			</header>
			<div className="page-content documents-page">
				<section className="page-title-row"><div><div className="eyebrow"><span className="sun-mark">▧</span> YOUR STUDY LIBRARY</div><h1>Documents<span>.</span></h1><p className="welcome-subtitle">Your notes and study materials, all in one place.</p></div><div className="upload-control"><input ref={inputRef} type="file" multiple accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.md" onChange={addFiles} /><button className="primary-button" type="button" onClick={() => inputRef.current?.click()}><span>＋</span> Upload files</button></div></section>
				<section className="document-summary" aria-label="Library summary"><div><span className="summary-icon">▧</span><span><strong>{documents.length}</strong><small>Files in your library</small></span></div><div><span className="summary-icon folder-icon">▰</span><span><strong>{new Set(documents.map((document) => document.subject)).size}</strong><small>Subjects covered</small></span></div><div className="summary-note"><span className="summary-spark">✳</span><span><strong>Study materials, together</strong><small>Keep your notes easy to find.</small></span></div></section>
				<section className="library-section" aria-labelledby="library-heading">
					<div className="library-toolbar"><div><div className="section-kicker">RECENTLY ADDED</div><h2 id="library-heading">Your library <span className="heading-count">{visibleDocuments.length}</span></h2></div><div className="filter-control" role="group" aria-label="Filter documents">{filters.map((item) => <button type="button" key={item} className={filter === item ? 'selected' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
					<div className="document-table-wrap"><table className="document-table"><thead><tr><th scope="col">NAME</th><th scope="col">SUBJECT</th><th scope="col">FILE SIZE</th><th scope="col">ADDED</th><th scope="col"><span className="visually-hidden">Actions</span></th></tr></thead><tbody>{visibleDocuments.map((document) => <tr key={document.id}><td><button type="button" className="document-name" onClick={() => setSelectedDocument(document)}><span className={`file-type-icon ${document.type === 'PDF' ? 'pdf-icon' : 'doc-icon'}`}>{document.type === 'PDF' ? 'PDF' : 'DOC'}</span><span><strong>{document.name}</strong><small>{document.type} file</small></span></button></td><td><span className="subject-tag"><span className={`subject-dot ${document.subject.toLowerCase()}`} />{document.subject}</span></td><td className="table-muted">{document.size}</td><td className="table-muted">{document.added}</td><td><button className="row-action" type="button" aria-label={`Remove ${document.name}`} onClick={() => setDocuments((current) => current.filter((item) => item.id !== document.id))}>×</button></td></tr>)}</tbody></table>{visibleDocuments.length === 0 && <p className="empty-library">No files found. Try another search or filter.</p>}</div>
				</section>
				<footer className="page-footer">Your library, ready when you are <span>✳</span></footer>
			</div>
			{selectedDocument && <div className="dialog-backdrop" onClick={() => setSelectedDocument(null)}><section className="document-dialog" role="dialog" aria-modal="true" aria-labelledby="document-dialog-title" onClick={(event) => event.stopPropagation()}><button className="dialog-close" type="button" aria-label="Close document details" onClick={() => setSelectedDocument(null)}>×</button><span className="file-type-icon pdf-icon">{selectedDocument.type === 'PDF' ? 'PDF' : 'DOC'}</span><div className="section-kicker">DOCUMENT DETAILS</div><h2 id="document-dialog-title">{selectedDocument.name}</h2><p>{selectedDocument.subject} · {selectedDocument.type} · {selectedDocument.size}</p><button className="primary-button" type="button" onClick={() => setSelectedDocument(null)}>Done</button></section></div>}
		</main>
	)
}

export default Documents
