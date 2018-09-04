import CachetAPI from '../src/index'

let cachet_api = new CachetAPI({
	url: "https://demo.cachethq.io/api",
	apiToken: "9yMHsdioQosnyVK4iCVR"
})

describe("General", () => {
	test("Ping", async () => {
		let res = await cachet_api.ping()

		expect(res).toBe("Pong!")
	})
	test("Version", async () => {
		let version = await cachet_api.getVersion(true)

		expect(version.meta).toBeDefined()
		expect(version.meta.on_latest).toBeDefined()

		version = await cachet_api.getVersion()

		expect(typeof version).toBe("string")
		expect(version.meta).toBeUndefined()
	})
})

describe("Components", () => {
	test("Get Components", async () => {
		let components = await cachet_api.getComponents()

		expect(components.length).toBeGreaterThan(1)
		expect(components[0].id).toBeDefined()
		expect(components[0].name).toBeDefined()
		expect(components[0].status).toBeDefined()
	})

	let added_component_id

	test("Add a Component", async () => {
		let component = await cachet_api.addComponent({
			name: "added component",
			description: "test description",
			status: 1
		})

		expect(component).toBeDefined()
		expect(component.id).toBeDefined()
		expect(component.name).toBe("added component")
		expect(component.status).toBeDefined()

		added_component_id = component.id

	})
	test("Get a Component", async () => {
		let component = await cachet_api.getComponent(added_component_id)

		expect(component).toBeDefined()
		expect(component.id).toBeDefined()
		expect(component.name).toBe("added component")
		expect(component.status).toBeDefined()
	})
	test("Update a Component", async () => {
		let component = await cachet_api.updateComponent(added_component_id, {
			name: "updated component",
			status: 4
		})

		expect(component).toBeDefined()
		expect(component.id).toBeDefined()
		expect(component.name).toBe("updated component")
		expect(component.status).toBe(4)
	})
	test("Delete a Component", async () => {
		let deleted = await cachet_api.deleteComponent(added_component_id)

		expect(deleted).toBe(true)
	})
})

describe("Component Groups", () => {
	test("Get Component Groups", async () => {
		let groups = await cachet_api.getComponentGroups()

		expect(groups.length).toBeGreaterThan(1)
		expect(groups[0].id).toBeDefined()
		expect(groups[0].name).toBeDefined()
	})

	let added_group_id

	test("Add a Component Group", async () => {
		let group = await cachet_api.addComponentGroup({
			name: "added group",
			collapsed: 0
		})

		expect(group).toBeDefined()
		expect(group.id).toBeDefined()
		expect(group.name).toBe("added group")
		expect(group.collapsed).toBe(0)

		added_group_id = group.id

	})
	test("Get a Component Group", async () => {
		let group = await cachet_api.getComponentGroup(added_group_id)

		expect(group).toBeDefined()
		expect(group.id).toBeDefined()
		expect(group.name).toBe("added group")
		expect(group.collapsed).toBe(0)
	})
	test("Update a Component Group", async () => {
		let group = await cachet_api.updateComponentGroup(added_group_id, {
			name: "updated group",
			collapsed: 1
		})

		expect(group).toBeDefined()
		expect(group.id).toBeDefined()
		expect(group.name).toBe("updated group")
		expect(group.collapsed).toBe(1)
	})
	test("Delete a Component Group", async () => {
		let deleted = await cachet_api.deleteComponentGroup(added_group_id)

		expect(deleted).toBe(true)
	})
})

describe("Incidents", () => {
	let component_for_incidents_id

	beforeAll(async () => {
		let component = await cachet_api.addComponent({
			name: "Test Incidents",
			description: "test description",
			status: 1
		})

		component_for_incidents_id = component.id
	});

	let added_incident_id

	test("Add an Incident", async () => {
		let incident = await cachet_api.addIncident({
			name: "added incident",
			message: "testing from npm package `cachetapi`",
			status: 1,
			visible: 1,

			component_id: component_for_incidents_id,
			component_status: 2
		})

		expect(incident).toBeDefined()
		expect(incident.id).toBeDefined()
		expect(incident.name).toBe("added incident")

		added_incident_id = incident.id

	})
	test("Get Incidents", async () => {
		let incidents = await cachet_api.getIncidents()

		expect(incidents.length).toBeGreaterThan(0)
		expect(incidents[0].id).toBeDefined()
		expect(incidents[0].name).toBeDefined()
	})
	test("Get an Incident", async () => {
		let incident = await cachet_api.getIncident(added_incident_id)

		expect(incident).toBeDefined()
		expect(incident.id).toBeDefined()
		expect(incident.name).toBe("added incident")
		expect(incident.status).toBe(1)
	})
	test("Update an Incident", async () => {
		let incident = await cachet_api.updateIncident(added_incident_id, {
			name: "updated incident",
			status: 2,

			component_id: component_for_incidents_id,
			component_status: 3
		})

		expect(incident).toBeDefined()
		expect(incident.id).toBeDefined()
		expect(incident.name).toBe("updated incident")
		expect(incident.status).toBe(2)
	})
	test("Delete an Incident", async () => {
		let deleted = await cachet_api.deleteIncident(added_incident_id)

		expect(deleted).toBe(true)
	})

	afterAll( async () => {
		await cachet_api.deleteComponent(component_for_incidents_id)
	})
})

/*
 * Incident Updates are broken when testing on the Cachet Demo API. It works fine when a regular Cachet API is used.
 */
/*
describe("Incident Updates", () => {
	let incident_id

	beforeAll(async () => {
		let incident = await cachet_api.addIncident({
			name: "Incident for Incident update tests",
			message: "testing from npm package `cachetapi`",
			status: 1,
			visible: 1
		})

		incident_id = incident.id
	});

	let added_incident_update_id

	test("Add an Incident Update", async () => {
		let update = await cachet_api.addIncidentUpdate(incident_id, {
			message: "add update",
			status: 2
		})

		expect(update).toBeDefined()
		expect(update.id).toBeDefined()
		expect(update.message).toBe("add update")

		added_incident_update_id = update.id

	})
	test("Get an Incident Update", async () => {
		let update = await cachet_api.getIncidentUpdate(incident_id, added_incident_update_id)

		expect(update).toBeDefined()
		expect(update.id).toBeDefined()
		expect(update.message).toBe("add update")
		expect(update.status).toBe(2)
	})
	test("Get Incident Updates", async () => {
		let updates = await cachet_api.getIncidentUpdates(incident_id)

		expect(updates.length).toBeGreaterThan(0)
		expect(updates[0].id).toBeDefined()
		expect(updates[0].message).toBeDefined()
	})
	test("Update an Incident Update", async () => {
		let update = await cachet_api.updateIncidentUpdate(incident_id, added_incident_update_id, {
			message: "updated update",
			status: 3
		})

		expect(update).toBeDefined()
		expect(update.id).toBeDefined()
		expect(update.message).toBe("updated update")
		expect(update.status).toBe(3)
	})
	test("Delete an Incident Update", async () => {
		let deleted = await cachet_api.deleteIncidentUpdate(incident_id, added_incident_update_id)

		expect(deleted).toBe(true)
	})

	afterAll( async () => {
		await cachet_api.deleteIncident(incident_id)
	})
})
*/

describe("Metrics", () => {
	let added_metric_id

	test("Add a Metric", async () => {
		let metric = await cachet_api.addMetric({
			name: "add metric",
			suffix: "something",
			description: "testing something",
			default_value: 1
		})

		expect(metric).toBeDefined()
		expect(metric.id).toBeDefined()
		expect(metric.name).toBe("add metric")

		added_metric_id = metric.id

	})
	test("Get a Metric", async () => {
		let metric = await cachet_api.getMetric(added_metric_id)

		expect(metric).toBeDefined()
		expect(metric.id).toBeDefined()
		expect(metric.name).toBe("add metric")
	})
	test("Get Metrics", async () => {
		let metric = await cachet_api.getMetrics()

		expect(metric.length).toBeGreaterThan(0)
		expect(metric[0].id).toBeDefined()
	})

	let added_metric_point_id

	test("Add a Metric Point", async () => {
		let point = await cachet_api.addMetricPoint(added_metric_id, {
			value: 0.75,
			timestamp: Date.now()
		})

		expect(point.id).toBeDefined()
		expect(point.value).toBeDefined()

		added_metric_point_id = point.id

	})
	test("Get Metric Points", async () => {
		let points = await cachet_api.getMetricPoints(added_metric_id)

		expect(points.length).toBeGreaterThan(0)
		expect(points[0].id).toBeDefined()
	})
	test("Delete a Metric Point", async () => {
		let deleted = await cachet_api.deleteMetricPoint(added_metric_id, added_metric_point_id)

		expect(deleted).toBe(true)
	})

	test("Delete a Metric", async () => {
		let deleted = await cachet_api.deleteMetric(added_metric_id)

		expect(deleted).toBe(true)
	})
})

/*
 * Subscriber add fails right now on alternate Cachet instance and never resolves.
 */

describe("Subscribers", () => {
	let subscriber_id

	test("Add a Subscriber", async () => {
		let subscriber = await cachet_api.addSubscriber({
			email: "email@example.com"
		})

		expect(subscriber).toBeDefined()
		expect(subscriber.id).toBeDefined()
		expect(subscriber.email).toBe("email@example.com")

		subscriber_id = subscriber.id

	}, 10000)
	test("Get Subscribers", async () => {
		let subscribers = await cachet_api.getSubscribers()

		expect(subscribers.length).toBeGreaterThan(0)
		expect(subscribers[0].email).toBeDefined()
	})
	test("Delete a Subscriber", async () => {
		let deleted = await cachet_api.deleteSubscriber(subscriber_id)

		expect(deleted).toBe(true)
	})
})




