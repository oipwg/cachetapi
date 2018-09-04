import axios from 'axios'

class CachetAPI {
	/**
	 * Create a new CachetAPI
	 * @param  {Object} options - Options about the CachetAPI Instance
	 * @param {String} options.url - The URL of the CachetAPI Instance
	 * @param {String} [options.apiToken] - The API Token for the CachetAPI Instance
	 * @return {CachetAPI}
	 *
	 * @example
	 * import CachetAPI from 'cachetapi'
	 *
	 * let cachet_api = new CachetAPI({
	 * 	url: "https://demo.cachethq.io/api",
	 * 	apiToken: "9yMHsdioQosnyVK4iCVR"
	 * })
	 */
	constructor(options){
		if (!options || !options.url)
			throw new Error("Error! options.url a is required option!")

		this.options = options

		this.api = axios.create({ baseURL: this.options.url, headers: {"X-Cachet-Token": this.options.apiToken} })
	}


	/* ----------------- GENERAL ----------------- */
	/**
	 * Ping the CachetAPI server and get back a response
	 * @return {Promise<String>} Responds with "Pong!" when online
	 *
	 * @example <caption>Async/Await</caption>
	 * let response = await cachet_api.ping()
	 * // response = "Pong!"
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.ping().then((response) => {
	 * 	// response = "Pong!"
	 * }).catch((error) => { })
	 */
	async ping(){
		let response 

		let url = "/v1/ping"

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		return response.data.data
	}
	/**
	 * Get the version of the CachetAPI server
	 * @param  {boolean} [with_meta=false] - Set this to true if you would like the original response with meta info (paginated info)
	 * @return {String|Object} Returns the current version as a string OR an Object if `with_meta` is `true`
	 *
	 * @example <caption>Async/Await</caption>
	 * let version = await cachet_api.getVersion()
	 * // version = "2.4.0-dev"
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getVersion().then((version) => {
	 * 	// version = "2.4.0-dev"
	 * }).catch((error) => { })
	 */
	async getVersion(with_meta){
		let response 

		let url = "/v1/version"

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		// If the user would like the "meta" data returned as well, they need to set the with_meta flag
		// otherwise, we will just return an array of Components 
		// (since its nicer to work with than always doing .data on the response)
		if (with_meta)
			return response.data
		else
			return response.data.data
	}

	/* ----------------- COMPONENTS ----------------- */
	/**
	 * @typedef {Object} Component
	 * @property {String} name - Name of the Component
	 * @property {String} description - Description of the Component
	 * @property {Integer} status - Status of the Component (See the {@link https://docs.cachethq.io/v1.0/docs/component-statuses Cachet Docs})
	 * @property {String} [id] - The id of the Component
	 * @property {String} [link] - A hyperlink to the Component
	 * @property {Integer} [order] - Order of the Component
	 * @property {Integer} [group_id] - The group id that the Component is within
	 * @property {Boolean} [enabled] - Whether the Component is enabled
	 */
	/**
	 * Get all the Components
	 * @param  {boolean} [with_meta=false] - Set this to true if you would like the original response with meta info (paginated info)
	 * @return {Promise<Array.<Component>>} Returns an Array of Components
	 * 
	 * @example <caption>Async/Await</caption>
	 * let components = await cachet_api.getComponents()
	 * // components = [{@link Component}, {@link Component}, {@link Component}]
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getComponents().then((components) => {
	 * 	// components = [{@link Component}, {@link Component}, {@link Component}]
	 * }).catch((error) => { })
	 */
	async getComponents(with_meta){
		let response 

		let url = "/v1/components"

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}	

		// If the user would like the "meta" data returned as well, they need to set the with_meta flag
		// otherwise, we will just return an array of Components 
		// (since its nicer to work with than always doing .data on the response)
		if (with_meta)
			return response.data
		else
			return response.data.data
	}
	/**
	 * Get a Component
	 * @param  {Integer} component_id - The ID of the Component you wish to get
	 * @return {Promise<Component>} Returns a component
	 * 
	 * @example <caption>Async/Await</caption>
	 * let component = await cachet_api.getComponent(0)
	 * // component = {@link Component}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getComponent(0).then((component) => {
	 * 	// component = {@link Component}
	 * }).catch((error) => { })
	 */
	async getComponent(component_id){
		let response 

		let url = "/v1/components/" + component_id

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Add a new Component
	 * @param  {Component} component - The Component you wish to add
	 * @return {Promise<Component>} Returns a component
	 * 
	 * @example <caption>Async/Await</caption>
	 * let component = await cachet_api.addComponent({
	 * 	name: "My Component",
	 * 	description: "My Description",
	 * 	status: 0
	 * })
	 * // component = {@link Component}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.addComponent({
	 * 	name: "My Component",
	 * 	description: "My Description",
	 * 	status: 0
	 * }).then((component) => {
	 * 	// component = {@link Component}
	 * }).catch((error) => { })
	 */
	async addComponent(component){
		let response 

		let url = "/v1/components"

		try {
			response = await this.api.post(url, component)
		} catch (e) {
			throw this.createError(url, 'POST', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Update a Component
	 * @param  {Integer} component_id - The ID of the Component you wish to update
	 * @param  {Component} component - The updated Component info
	 * @return {Promise<Component>} Returns a component
	 * 
	 * @example <caption>Async/Await</caption>
	 * let component = await cachet_api.updateComponent(0, {
	 * 	name: "My Updated Component",
	 * 	status: 1
	 * })
	 * // component = {@link Component}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.updateComponent(0, {
	 * 	name: "My Updated Component",
	 * 	status: 1
	 * }).then((component) => {
	 * 	// component = {@link Component}
	 * }).catch((error) => { })
	 */
	async updateComponent(component_id, component){
		let response 

		let url = "/v1/components/" + component_id

		try {
			response = await this.api.put(url, component)
		} catch (e) {
			throw this.createError(url, 'PUT', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Delete a Component
	 * @param  {Integer} component_id - The ID of the Component you wish to delete
	 * @return {Promise<Boolean>} Returns `true` if component deletion was successful
	 * 
	 * @example <caption>Async/Await</caption>
	 * let success = await cachet_api.deleteComponent(0)
	 * // success = true
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.deleteComponent(0).then((success) => {
	 * 	// success = true
	 * }).catch((error) => { })
	 */
	async deleteComponent(component_id){
		let response 

		let url = "/v1/components/" + component_id

		try {
			response = await this.api.delete(url)
		} catch (e) {
			throw this.createError(url, 'DELETE', e)
		}

		// Since nothing is returned from the API other than `204`, return true
		return true
	}

	/* ----------------- COMPONENT GROUPS ----------------- */
	/**
	 * @typedef {Object} ComponentGroup
	 * @property {String} name - Name of the Component Group
	 * @property {Integer} [order] - Order of the Component Group
	 * @property {Integer} [collapsed] - Whether the Component Group is collapsed (0 = no, 1 = yes, 2 = if a component status is not Operational)
	 */
	/**
	 * Get all the Component Groups
	 * @param  {boolean} [with_meta=false] - Set this to true if you would like the original response with meta info (paginated info)
	 * @return {Promise<Array.<ComponentGroup>>} Returns an Array of Component Groups
	 * 
	 * @example <caption>Async/Await</caption>
	 * let component_groups = await cachet_api.getComponentGroups()
	 * // component_groups = [{@link ComponentGroup}, {@link ComponentGroup}, {@link ComponentGroup}]
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getComponentGroups().then((component_groups) => {
	 * 	// component_groups = [{@link ComponentGroup}, {@link ComponentGroup}, {@link ComponentGroup}]
	 * }).catch((error) => { })
	 */
	async getComponentGroups(with_meta){
		let response 

		let url = "/v1/components/groups"

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}	

		// If the user would like the "meta" data returned as well, they need to set the with_meta flag
		// otherwise, we will just return an array of Components 
		// (since its nicer to work with than always doing .data on the response)
		if (with_meta)
			return response.data
		else
			return response.data.data
	}
	/**
	 * Get a Component Group
	 * @param  {Integer} group_id - The ID of the Component Group you wish to get
	 * @return {Promise<ComponentGroup>} Returns a Component Group
	 * 
	 * @example <caption>Async/Await</caption>
	 * let component_group = await cachet_api.getComponentGroup(0)
	 * // component_group = {@link ComponentGroup}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getComponentGroup(0).then((component_group) => {
	 * 	// component_group = {@link ComponentGroup}
	 * }).catch((error) => { })
	 */
	async getComponentGroup(group_id){
		let response 

		let url = "/v1/components/groups/" + group_id

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Add a new Component Group
	 * @param  {ComponentGroup} group - The Component Group you wish to add
	 * @return {Promise<ComponentGroup>} Returns a Component Group
	 * 
	 * @example <caption>Async/Await</caption>
	 * let component_group = await cachet_api.addComponentGroup({
	 * 	name: "My Component Group"
	 * })
	 * // component_group = {@link ComponentGroup}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.addComponentGroup({
	 * 	name: "My Component Group"
	 * }).then((component_group) => {
	 * 	// component_group = {@link ComponentGroup}
	 * }).catch((error) => { })
	 */
	async addComponentGroup(group){
		let response 

		let url = "/v1/components/groups"

		try {
			response = await this.api.post(url, group)
		} catch (e) {
			throw this.createError(url, 'POST', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Update a Component Group
	 * @param  {Integer} group_id - The ID of the Component Group you wish to update
	 * @param  {ComponentGroup} group - The updated Component Group info
	 * @return {Promise<ComponentGroup>} Returns a component
	 * 
	 * @example <caption>Async/Await</caption>
	 * let component_group = await cachet_api.updateComponentGroup(0, {
	 * 	name: "My Updated Component Group"
	 * })
	 * // component_group = {@link ComponentGroup}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.updateComponentGroup(0, {
	 * 	name: "My Updated Component Group"
	 * }).then((component_group) => {
	 * 	// component_group = {@link ComponentGroup}
	 * }).catch((error) => { })
	 */
	async updateComponentGroup(group_id, group){
		let response 

		let url = "/v1/components/groups/" + group_id

		try {
			response = await this.api.put(url, group)
		} catch (e) {
			throw this.createError(url, 'PUT', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Delete a ComponentGroup
	 * @param  {Integer} group_id - The ID of the Component Group you wish to delete
	 * @return {Promise<Boolean>} Returns `true` if Component Group deletion was successful
	 * 
	 * @example <caption>Async/Await</caption>
	 * let success = await cachet_api.deleteComponentGroup(0)
	 * // success = true
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.deleteComponentGroup(0).then((success) => {
	 * 	// success = true
	 * }).catch((error) => { })
	 */
	async deleteComponentGroup(group_id){
		let response 

		let url = "/v1/components/groups/" + group_id

		try {
			response = await this.api.delete(url)
		} catch (e) {
			throw this.createError(url, 'DELETE', e)
		}

		// Since nothing is returned from the API other than `204`, return true
		return true
	}

	/* ----------------- INCIDENTS ----------------- */
	/**
	 * @typedef {Object} Incident
	 * @property {String} name - Name of the Incident
	 * @property {String} message - The Incident message
	 * @property {Integer} status - Status of the Incident (See the {@link https://docs.cachethq.io/v1.0/docs/incident-statuses Cachet Docs})
	 * @property {Integer} visible - 0 to hide, 1 to show
	 * @property {String} [component_id] - Component to update. (Required with component_status)
	 * @property {String} [component_status] - The status to update the given component with
	 * @property {Boolean} [notify] - Whether to notify subscribers
	 * @property {Integer} [created_at] - When the Incident was created
	 * @property {String} [template] - The template slug to use.
	 * @property {Array.<String>} [vars] - The variables to pass to the template.
	 */
	/**
	 * Get all the Incidents
	 * @param  {Boolean} [with_meta=false] - Set this to true if you would like the original response with meta info (paginated info)
	 * @return {Promise<Array.<Incident>>} Returns an Array of Incidents
	 * 
	 * @example <caption>Async/Await</caption>
	 * let incident = await cachet_api.getIncidents()
	 * // incident = [{@link Incident}, {@link Incident}, {@link Incident}]
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getIncidents().then((incident) => {
	 * 	// incident = [{@link Incident}, {@link Incident}, {@link Incident}]
	 * }).catch((error) => { })
	 */
	async getIncidents(with_meta){
		let response 

		let url = "/v1/incidents"

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}	

		// If the user would like the "meta" data returned as well, they need to set the with_meta flag
		// otherwise, we will just return an array of Components 
		// (since its nicer to work with than always doing .data on the response)
		if (with_meta)
			return response.data
		else
			return response.data.data
	}
	/**
	 * Get an Incident
	 * @param  {Integer} incident_id - The ID of the Incident you wish to get
	 * @return {Promise<Incident>} Returns an Incident
	 * 
	 * @example <caption>Async/Await</caption>
	 * let incident = await cachet_api.getIncident(0)
	 * // incident = {@link Incident}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getIncident(0).then((incident) => {
	 * 	// incident = {@link Incident}
	 * }).catch((error) => { })
	 */
	async getIncident(incident_id){
		let response 

		let url = "/v1/incidents/" + incident_id

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Add a new Incident
	 * @param  {Incident} incident - The Incident you wish to add
	 * @return {Promise<Incident>} Returns an Incident
	 * 
	 * @example <caption>Async/Await</caption>
	 * let incident = await cachet_api.addIncident({
	 * 	name: "My Incident",
	 * 	message: "My Incident message",
	 * 	status: 0,
	 * 	visible: 1
	 * })
	 * // incident = {@link Incident}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.addIncident({
	 * 	name: "My Incident",
	 * 	message: "My Incident message",
	 * 	status: 0,
	 * 	visible: 1
	 * }).then((incident) => {
	 * 	// incident = {@link Incident}
	 * }).catch((error) => { })
	 */
	async addIncident(incident){
		let response 

		let url = "/v1/incidents"

		try {
			response = await this.api.post(url, incident)
		} catch (e) {
			throw this.createError(url, 'POST', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Update an Incident
	 * @param  {Integer} incident_id - The ID of the Incident you wish to update
	 * @param  {Incident} incident - The updated Incident info
	 * @return {Promise<Incident>} Returns an Incident
	 * 
	 * @example <caption>Async/Await</caption>
	 * let incident = await cachet_api.updateIncident(0, {
	 * 	name: "My Updated Incident",
	 * 	status: 1
	 * })
	 * // incident = {@link Incident}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.updateIncident(0, {
	 * 	name: "My Updated Incident",
	 * 	status: 1
	 * }).then((incident) => {
	 * 	// incident = {@link Incident}
	 * }).catch((error) => { })
	 */
	async updateIncident(incident_id, incident){
		let response 

		let url = "/v1/incidents/" + incident_id

		try {
			response = await this.api.put(url, incident)
		} catch (e) {
			throw this.createError(url, 'PUT', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Delete an Incident
	 * @param  {Integer} incident_id - The ID of the Incident you wish to delete
	 * @return {Promise<Boolean>} Returns `true` if the Incident deletion was successful
	 * 
	 * @example <caption>Async/Await</caption>
	 * let success = await cachet_api.deleteIncident(0)
	 * // success = true
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.deleteIncident(0).then((success) => {
	 * 	// success = true
	 * }).catch((error) => { })
	 */
	async deleteIncident(incident_id){
		let response 

		let url = "/v1/incidents/" + incident_id

		try {
			response = await this.api.delete(url)
		} catch (e) {
			throw this.createError(url, 'DELETE', e)
		}

		// Since nothing is returned from the API other than `204`, return true
		return true
	}

	/* ----------------- INCIDENT UPDATES ----------------- */
	/**
	 * @typedef {Object} IncidentUpdate
	 * @property {String} message - Description of the Incident Update
	 * @property {Integer} status - Status of the Incident Update (See the {@link https://docs.cachethq.io/v1.0/docs/incident-statuses Cachet Docs})
	 */
	/**
	 * Get all the IncidentUpdates for a specific Incident
	 * @param  {Integer} incident_id - The ID of the Incident you wish to get Incident Updates for
	 * @param  {boolean} [with_meta=false] - Set this to true if you would like the original response with meta info (paginated info)
	 * @return {Promise<Array.<IncidentUpdate>>} Returns an Array of IncidentUpdates
	 * 
	 * @example <caption>Async/Await</caption>
	 * let incident_updates = await cachet_api.getIncidentUpdates()
	 * // incident_updates = [{@link IncidentUpdate}, {@link IncidentUpdate}, {@link IncidentUpdate}]
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getIncidentUpdates().then((incident_updates) => {
	 * 	// incident_updates = [{@link IncidentUpdate}, {@link IncidentUpdate}, {@link IncidentUpdate}]
	 * }).catch((error) => { })
	 */
	async getIncidentUpdates(incident_id, with_meta){
		let response 

		let url = "/v1/incidents/" + incident_id + "/updates" 

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}	

		// If the user would like the "meta" data returned as well, they need to set the with_meta flag
		// otherwise, we will just return an array of Components 
		// (since its nicer to work with than always doing .data on the response)
		if (with_meta)
			return response.data
		else
			return response.data.data
	}
	/**
	 * Get an Incident Update
	 * @param  {Integer} incident_id - The ID of the Incident you wish to get the specific Incident Update from
	 * @param  {Integer} update_id - The ID of the Incident Update you wish to get
	 * @return {Promise<IncidentUpdate>} Returns an Incident Update
	 * 
	 * @example <caption>Async/Await</caption>
	 * let incident_update = await cachet_api.getIncidentUpdate(0, 0)
	 * // incident_update = {@link IncidentUpdate}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getIncidentUpdate(0, 0).then((incident_update) => {
	 * 	// incident_update = {@link IncidentUpdate}
	 * }).catch((error) => { })
	 */
	async getIncidentUpdate(incident_id, update_id){
		let response 

		let url = "/v1/incidents/" + incident_id + "/updates/" + update_id

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Add a new Incident Update
	 * @param  {Integer} incident_id - The ID of the Incident you wish to add an Incident Updates to
	 * @param  {IncidentUpdate} update - The Incident Update you wish to add
	 * @return {Promise<IncidentUpdate>} Returns an IncidentUpdate
	 * 
	 * @example <caption>Async/Await</caption>
	 * let incident_update = await cachet_api.addIncidentUpdate(0, {
	 * 	message: "My Update",
	 * 	status: 2
	 * })
	 * // incident_update = {@link IncidentUpdate}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.addIncidentUpdate(0, {
	 * 	message: "My Update",
	 * 	status: 2
	 * }).then((incident_update) => {
	 * 	// incident_update = {@link IncidentUpdate}
	 * }).catch((error) => { })
	 */
	async addIncidentUpdate(incident_id, update){
		let response 

		let url = "/v1/incidents/" + incident_id + "/updates"

		try {
			response = await this.api.post(url, update)
		} catch (e) {
			throw this.createError(url, 'POST', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Update an Incident Update
	 * @param  {Integer} incident_id - The ID of the Incident that you wish to update an Incident Updates on
	 * @param  {Integer} update_id - The ID of the Incident Update you wish to update
	 * @param  {IncidentUpdate} update - The updated IncidentUpdate
	 * @return {Promise<IncidentUpdate>} Returns a component
	 * 
	 * @example <caption>Async/Await</caption>
	 * let incident_update = await cachet_api.updateIncidentUpdate(0, 0, {
	 * 	message: "My Updated Message",
	 * 	status: 4
	 * })
	 * // incident_update = {@link IncidentUpdate}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.updateIncidentUpdate(0, 0, {
	 * 	message: "My Updated Message",
	 * 	status: 4
	 * }).then((incident_update) => {
	 * 	// incident_update = {@link IncidentUpdate}
	 * }).catch((error) => { })
	 */
	async updateIncidentUpdate(incident_id, update_id, update){
		let response 

		let url = "/v1/incidents/" + incident_id + "/updates/" + update_id

		try {
			response = await this.api.put(url, update)
		} catch (e) {
			throw this.createError(url, 'PUT', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Delete an Incident Update
	 * @param  {Integer} incident_id - The ID of the Incident that you wish to delete an Incident Updates from
	 * @param  {Integer} update_id - The ID of the Incident Update you wish to delete
	 * @return {Promise<Boolean>} Returns `true` if Incident Update deletion was successful
	 * 
	 * @example <caption>Async/Await</caption>
	 * let success = await cachet_api.deleteIncidentUpdate(0, 0)
	 * // success = true
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.deleteIncidentUpdate(0, 0).then((success) => {
	 * 	// success = true
	 * }).catch((error) => { })
	 */
	async deleteIncidentUpdate(incident_id, update_id){
		let response 

		let url = "/v1/incidents/" + incident_id + "/updates/" + update_id

		try {
			response = await this.api.delete(url)
		} catch (e) {
			throw this.createError(url, 'DELETE', e)
		}

		// Since nothing is returned from the API other than `204`, return true
		return true
	}

	/* ----------------- METRICS ----------------- */
	/**
	 * @typedef {Object} Metric
	 * @property {String} name - Name of the Metric
	 * @property {String} description - Description of what the metric is measuring
	 * @property {Integer} suffix - Measurments in
	 * @property {Integer} default_value - The default value to use when a point is added
	 * @property {Boolean} [display_chart] - Whether the Chart for the metric should be displayed
	 */
	/**
	 * Get all the Metrics
	 * @param  {boolean} [with_meta=false] - Set this to true if you would like the original response with meta info (paginated info)
	 * @return {Promise<Array.<Metric>>} Returns an Array of Metrics
	 * 
	 * @example <caption>Async/Await</caption>
	 * let metrics = await cachet_api.getMetrics()
	 * // metrics = [{@link Metric}, {@link Metric}, {@link Metric}]
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getMetrics().then((metrics) => {
	 * 	// metrics = [{@link Metric}, {@link Metric}, {@link Metric}]
	 * }).catch((error) => { })
	 */
	async getMetrics(with_meta){
		let response 

		let url = "/v1/metrics"

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}	

		// If the user would like the "meta" data returned as well, they need to set the with_meta flag
		// otherwise, we will just return an array of Components 
		// (since its nicer to work with than always doing .data on the response)
		if (with_meta)
			return response.data
		else
			return response.data.data
	}
	/**
	 * Get a Metric
	 * @param  {Integer} metric_id - The ID of the Metric you wish to get
	 * @return {Promise<Metric>} Returns a Metric
	 * 
	 * @example <caption>Async/Await</caption>
	 * let metric = await cachet_api.getMetric(0)
	 * // metric = {@link Metric}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getMetric(0).then((metric) => {
	 * 	// metric = {@link Metric}
	 * }).catch((error) => { })
	 */
	async getMetric(metric_id){
		let response 

		let url = "/v1/metrics/" + metric_id

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Add a new Metric
	 * @param  {Metric} metric - The Metric you wish to add
	 * @return {Promise<Metric>} Returns a Metric
	 * 
	 * @example <caption>Async/Await</caption>
	 * let metric = await cachet_api.addMetric({
	 * 	name: "My Metric",
	 * 	suffix: "F",
	 * 	description: "My Metric Description",
	 * 	default_value: 1
	 * })
	 * // metric = {@link Metric}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.addMetric({
	 * 	name: "My Metric",
	 * 	suffix: "F",
	 * 	description: "My Metric Description",
	 * 	default_value: 1
	 * }).then((metric) => {
	 * 	// metric = {@link Metric}
	 * }).catch((error) => { })
	 */
	async addMetric(metric){
		let response 

		let url = "/v1/metrics"

		try {
			response = await this.api.post(url, metric)
		} catch (e) {
			throw this.createError(url, 'POST', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Delete a Metric
	 * @param  {Integer} metric_id - The ID of the Metric you wish to delete
	 * @return {Promise<Boolean>} Returns `true` if Metric deletion was successful
	 * 
	 * @example <caption>Async/Await</caption>
	 * let success = await cachet_api.deleteMetric(0)
	 * // success = true
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.deleteMetric(0).then((success) => {
	 * 	// success = true
	 * }).catch((error) => { })
	 */
	async deleteMetric(metric_id){
		let response 

		let url = "/v1/metrics/" + metric_id

		try {
			response = await this.api.delete(url)
		} catch (e) {
			throw this.createError(url, 'DELETE', e)
		}

		// Since nothing is returned from the API other than `204`, return true
		return true
	}
	/**
	 * @typedef {Object} MetricPoint
	 * @property {Number} value - Value to plot on the metric graph
	 * @property {Timestamp} [timestamp] - Unix timestamp of the point was measured
	 */
	/**
	 * Get all the Metric Points
	 * @param  {Integer} metric_id - The ID of the Metric you wish to get Metric Points from
	 * @param  {boolean} [with_meta=false] - Set this to true if you would like the original response with meta info (paginated info)
	 * @return {Promise<Array.<MetricPoint>>} Returns an Array of Components
	 * 
	 * @example <caption>Async/Await</caption>
	 * let metric_point = await cachet_api.getMetricPoints(0)
	 * // metric_point = [{@link MetricPoint}, {@link MetricPoint}, {@link MetricPoint}]
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getMetricPoints(0).then((metric_point) => {
	 * 	// metric_point = [{@link MetricPoint}, {@link MetricPoint}, {@link MetricPoint}]
	 * }).catch((error) => { })
	 */
	async getMetricPoints(metric_id){
		let response 

		let url = "/v1/metrics/" + metric_id + "/points"

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Add a new Component
	 * @param  {Integer} metric_id - The ID of the Metric you wish to add a Metric Point to
	 * @param  {MetricPoint} point - The Metric Point you wish to add
	 * @return {Promise<MetricPoint>} Returns a MetricPoint
	 * 
	 * @example <caption>Async/Await</caption>
	 * let metric_point = await cachet_api.addMetricPoint({
	 * 	value: 0.75
	 * })
	 * // metric_point = {@link MetricPoint}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.addMetricPoint({
	 * 	value: 0.75
	 * }).then((metric_point) => {
	 * 	// metric_point = {@link MetricPoint}
	 * }).catch((error) => { })
	 */
	async addMetricPoint(metric_id, point){
		let response 

		let url = "/v1/metrics/" + metric_id + "/points"

		try {
			response = await this.api.post(url, point)
		} catch (e) {
			throw this.createError(url, 'POST', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Delete a Metric Point
	 * @param  {Integer} metric_id - The ID of the Metric you wish to delete a Metric Point from
	 * @param  {Integer} point_id - The ID of the Metric Point you wish to delete
	 * @return {Promise<Boolean>} Returns `true` if Metric Point deletion was successful
	 * 
	 * @example <caption>Async/Await</caption>
	 * let success = await cachet_api.deleteMetricPoint(0, 0)
	 * // success = true
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.deleteMetricPoint(0, 0).then((success) => {
	 * 	// success = true
	 * }).catch((error) => { })
	 */
	async deleteMetricPoint(metric_id, point_id){
		let response 

		let url = "/v1/metrics/" + metric_id + "/points/" + point_id

		try {
			response = await this.api.delete(url)
		} catch (e) {
			throw this.createError(url, 'DELETE', e)
		}

		// Since nothing is returned from the API other than `204`, return true
		return true
	}

	/* ----------------- SUBSCRIBERS ----------------- */
	/**
	 * @typedef {Object} Subscriber
	 * @property {String} email - Name of the Component
	 * @property {Boolean} [verify] - Whether the Component is enabled
	 * @property {Array.<Integer>} [components="*"] - Array of component_id's that you wish to subscribe to
	 */
	/**
	 * Get all the Subscribers
	 * @param  {boolean} [with_meta=false] - Set this to true if you would like the original response with meta info (paginated info)
	 * @return {Promise<Array.<Subscriber>>} Returns an Array of Subscribers
	 * 
	 * @example <caption>Async/Await</caption>
	 * let subscribers = await cachet_api.getSubscribers()
	 * // subscribers = [{@link Subscriber}, {@link Subscriber}, {@link Subscriber}]
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.getSubscribers().then((subscribers) => {
	 * 	// subscribers = [{@link Subscriber}, {@link Subscriber}, {@link Subscriber}]
	 * }).catch((error) => { })
	 */
	async getSubscribers(){
		let response 

		let url = "/v1/subscribers"

		try {
			response = await this.api.get(url)
		} catch (e) {
			throw this.createError(url, 'GET', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Add a new Subscriber
	 * @param  {Subscriber} subscriber - The Subscriber you wish to add
	 * @return {Promise<Subscriber>} Returns a Subscriber
	 * 
	 * @example <caption>Async/Await</caption>
	 * let subscriber = await cachet_api.addSubscriber({
	 * 	email: "email@example.com"
	 * })
	 * // subscriber = {@link Subscriber}
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.addSubscriber({
	 * 	email: "email@example.com"
	 * }).then((subscriber) => {
	 * 	// subscriber = {@link Subscriber}
	 * }).catch((error) => { })
	 */
	async addSubscriber(subscriber){
		let response 

		let url = "/v1/subscribers"

		try {
			response = await this.api.post(url, subscriber)
		} catch (e) {
			throw this.createError(url, 'POST', e)
		}

		// axios wraps in data AND cachet wraps in data. Unwrap both.
		return response.data.data
	}
	/**
	 * Delete a Subscriber
	 * @param  {Integer} subscriber_id - The ID of the Subscriber you wish to delete
	 * @return {Promise<Boolean>} Returns `true` if Subscriber deletion was successful
	 * 
	 * @example <caption>Async/Await</caption>
	 * let success = await cachet_api.deleteSubscriber(0)
	 * // success = true
	 *
	 * @example <caption>Promise</caption>
	 * cachet_api.deleteSubscriber(0).then((success) => {
	 * 	// success = true
	 * }).catch((error) => { })
	 */
	async deleteSubscriber(subscriber_id){
		let response 

		let url = "/v1/subscribers/" + subscriber_id

		try {
			response = await this.api.delete(url)
		} catch (e) {
			throw this.createError(url, 'DELETE', e)
		}

		// Since nothing is returned from the API other than `204`, return true
		return true
	}

	/* ----------------- Utilities ----------------- */
	createError(url, type, error){
		var extraErrorText = "";

		if (error && error.response){
			if (error.response.status)
				extraErrorText += error.response.status + " "
			if (error.response.statusText)
				extraErrorText += error.response.statusText + " | "
			if (error.response.data)
				extraErrorText += JSON.stringify(error.response.data)
		} else {
			extraErrorText = error.toString()
		}

		console.error(error)
		
		return new Error("Unable to " + type + " " + url + ": " + extraErrorText)
	}
}

module.exports = CachetAPI